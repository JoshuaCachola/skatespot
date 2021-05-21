import { Arg, Field, Mutation, ObjectType, Query, Resolver, Ctx, UseMiddleware, Int } from 'type-graphql';
import argon2 from 'argon2';
import { User } from './entity/User';
import { createToken } from './utils/createToken';
import { TokenCookieCtx } from './types/TokenCookieCtx';
import { isAuth } from './utils/isAuth';
import { sendRefreshTokenInCookie } from './utils/sendRefreshTokenInCookie';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { Upload } from './types/Upload';
import { GraphQLUpload } from 'graphql-upload';

const s3 = require('./config/s3');

interface Payload {
  userId: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user?: User;
}

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return false;
    }

    try {
      const hashedPassword = await argon2.hash(password);
      await User.insert({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
      });
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: TokenCookieCtx,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        accessToken: '',
      };
    }

    if (await argon2.verify(user.password, password)) {
      const accessToken = createToken.access(user);
      sendRefreshTokenInCookie(res, createToken.refresh(user));
      return {
        accessToken,
        user,
      };
    } else {
      return {
        accessToken: '',
      };
    }
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number): Promise<boolean> {
    try {
      await getConnection().getRepository(User).increment({ id: userId }, 'tokenVersion', 1);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: TokenCookieCtx) {
    sendRefreshTokenInCookie(res, '');
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async uploadProfilePicture(
    @Arg('profilePicture', () => GraphQLUpload) { createReadStream, filename, mimetype }: Upload,
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    const { Location } = await s3
      .upload({
        Body: createReadStream(),
        Key: `${filename}`,
        ContentType: mimetype,
      })
      .promise();
    return new Promise((resolve, reject) => {
      if (Location) {
        resolve(true);
      } else {
        reject(false);
      }
    }).then(async () => {
      try {
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({ profilePicture: Location })
          .where('id = :id', { id })
          .execute();
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    });
  }

  @Query(() => String)
  hello(): string {
    return 'hi';
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users(): Promise<Array<User>> {
    return await User.find();
  }

  @Query(() => User)
  async getUser(@Ctx() { req }: TokenCookieCtx) {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    const accessToken = authorization.split(' ')[1];
    const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as Payload;

    return await User.findOne(payload.userId);
  }
}

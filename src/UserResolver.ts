import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("username") username: string,
  ) {
    try {
      const hashedPassword = await argon2.hash(password);
      await User.insert({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username
      });
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        accessToken: "",
      };
    }

    if (await argon2.verify(user.password, password)) {
      const accessToken = sign({ userId: user.id }, "change-in-prod", {
        expiresIn: "15m",
      });
      return {
        accessToken,
      };
    } else {
      return {
        accessToken: "",
      };
    }
  }

  @Query(() => [User])
  users() {
    return User.find();
  }
}

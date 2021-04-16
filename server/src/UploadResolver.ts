import { Arg, /*Field, ObjectType,*/ Mutation, Ctx, Resolver } from "type-graphql";
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from "stream";
import { createWriteStream } from "fs";
import { TokenCookieCtx } from "./types/TokenCookieCtx";
import { User } from './entity/User';
import { verify } from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { Payload } from './types/JwtPayload';
const s3 = require('./config/s3');

interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}


// @ObjectType()
// class UploadResponse {
//   @Field()
//   ok: boolean;

//   @Field()
//   location: string;
// }

@Resolver()
export class UploadResolver {
  @Mutation(() => Boolean)
  async singleUpload (@Arg('file', () => GraphQLUpload) {
    createReadStream,
    filename
  }: Upload): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(__dirname + `/images/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    })
  }

  @Mutation(() => Boolean)
  async uploadProfilePicture(
    @Arg('picture', () => GraphQLUpload) {
      createReadStream,
      filename,
      mimetype,
    }: Upload,
    @Ctx() {req}: TokenCookieCtx
  ): Promise<boolean> {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      return false;
    }

    const accessToken = authorization.split(' ')[1];
    const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as Payload;

    if (!payload.userId) {
      return false;
    }

    const { Location } = await s3.upload({
      Body: createReadStream(),
      Key: `${filename}`,
      ContentType: mimetype
    }).promise()
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
          .where('id = :id', { id: payload.userId })
          .execute();
        return true;
      } catch(err) {
        console.error(err)
        return false;
      }
    })
  }
};

import { Arg, Field, ObjectType, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from "stream";
import { createWriteStream } from "fs";
const s3 = require('./config/s3');

interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@ObjectType()
class UploadResponse {
  @Field()
  ok: boolean;

  @Field()
  location: string;
}

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

  @Mutation(() => UploadResponse)
  async singleUploadS3(@Arg('file', () => GraphQLUpload) {
    createReadStream,
    filename,
    mimetype,
  }: Upload): Promise<UploadResponse> {
    const { Location } = await s3.upload({
      Body: createReadStream(),
      Key: `${filename}`,
      ContentType: mimetype
    }).promise()
    return new Promise((resolve, reject) => {
      if (Location) {
        resolve({
          ok: true,
          location: Location
        })
      } else {
        reject({
          ok: false,
          location: ''
        })
      }
    })
  }
};

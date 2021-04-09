import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from "stream";
import { createWriteStream } from "fs";

interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
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
};

import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { SkateSpot } from "./entity/SkateSpot";
import { isAuth } from "./utils/isAuth";
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from "stream";
const s3 = require('./config/s3');

interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
};

@Resolver()
export class SkateSpotResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSkateSpot(
    @Arg('name') name: string,
    @Arg('address') address: string,
    @Arg('city') city: string,
    @Arg('state') state: string,
    @Arg('test', () => [String], { nullable: true }) test: string,
    @Arg('imgFiles', () => [GraphQLUpload], { nullable: true }) imgFiles?: [Upload]
  ): Promise<boolean> {
    const skateSpot = await SkateSpot.findOne({ where: { address, city, state }});
    if (skateSpot) {
      return false;
    }

    console.log(test.length);
    let imgLinks: Array<Promise<string>> = [];
    console.log(imgLinks);
    if (imgFiles) {
      imgLinks = imgFiles?.map(async (img) => {
        const { Location } = await s3.upload({
          Body: img.createReadStream(),
          Key: `${img.filename}`,
          ContentType: img.mimetype
        }).promise();

          return new Promise((resolve, reject) => {
            if (Location) {
              resolve(Location);
            } else {
              reject(undefined);
            }
          });
      });
    }

    try {
      await SkateSpot.insert({
        name,
        address,
        city,
        state,
        imgs: imgLinks.length ? JSON.stringify(imgLinks.filter(link => link)) : undefined
      });
      
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  
  @Query(() => [SkateSpot])
  @UseMiddleware(isAuth)
  async getSkateSpots(
    @Arg('name') name: string,
    @Arg('address') address: string,
    @Arg('city') city: string,
    @Arg('state') state: string,
  ) {
    return await SkateSpot.find({ where: { name, address, city, state }});
  };
};

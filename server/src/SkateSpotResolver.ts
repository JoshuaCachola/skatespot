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
    @Arg('imgFiles', () => [GraphQLUpload]) imgFiles?: [Upload]
  ): Promise<boolean> {
    const skateSpot = await SkateSpot.findOne({ where: { address, city, state }});
    if (skateSpot) {
      return false;
    }

    let imgLinks: Array<string> = [];
    imgFiles && imgFiles.forEach(async (img) => {
      const { Location } = await s3.upload({
      Body: img.createReadStream(),
      Key: `${img.filename}`,
      ContentType: img.mimetype
    })

    imgLinks.push(Location)
    });

    try {
      await SkateSpot.insert({
        name,
        address,
        city,
        state,
        imgs: JSON.stringify(imgLinks)
      });
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
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
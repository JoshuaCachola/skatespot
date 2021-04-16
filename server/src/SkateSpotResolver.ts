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
    @Arg('imgFiles', () => [GraphQLUpload], { nullable: true }) imgFiles?: [Upload]
  ): Promise<boolean> {
    const skateSpot = await SkateSpot.findOne({ where: { name, address, city, state }});
    if (skateSpot) {
      return false;
    }

    let imgLinks: Array<string> = [];
    imgFiles && Promise.all(imgFiles).then((files) => {
      files.forEach(async (file) => {
        const { Location } = await s3.upload({
          Body: file.createReadStream(),
          Key: `${file.filename}`,
          ContentType: file.mimetype
        }).promise();

        return new Promise((resolve, reject) => {
          if (Location) {
            resolve(Location);
          } else {
            reject(undefined);
          }
        }).then((url) => {
          imgLinks.push(url as string);
          console.log(imgLinks)
        }).then(async () => {
          try {
            await SkateSpot.insert({
              name,
              address,
              city,
              state,
              imgs: imgLinks ? JSON.stringify(imgLinks.filter(img => img !== undefined)) : undefined
            });
            
            return true;
          } catch (err) {
            console.error(err);
            return false;
          }
        })
      });
    })
    try {
      await SkateSpot.insert({
        name,
        address,
        city,
        state,
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

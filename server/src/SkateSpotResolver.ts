import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { SkateSpot } from './entity/SkateSpot';
import { isAuth } from './utils/isAuth';
import { GraphQLUpload } from 'graphql-upload';
import { getGeocoding } from './utils/geocoding';
import { Upload } from './types/Upload';
import { getConnection } from 'typeorm';

const s3 = require('./config/s3');

@Resolver(() => SkateSpot)
export class SkateSpotResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSkateSpot(
    @Arg('name') name: string,
    @Arg('street') street: string,
    @Arg('city') city: string,
    @Arg('state') state: string,
    @Arg('imgFiles', () => [GraphQLUpload], { nullable: true }) imgFiles?: [Upload],
  ): Promise<boolean> {
    const skateSpot = await SkateSpot.findOne({ where: { name, street, city, state } });
    if (skateSpot) {
      return false;
    }

    getGeocoding('1600 Amphitheatre Parkway', 'Mountain View', 'California');
    let imgLinks: Array<string> = [];
    imgFiles &&
      Promise.all(imgFiles).then((files) => {
        files.forEach(async (file) => {
          const { Location } = await s3
            .upload({
              Body: file.createReadStream(),
              Key: `${file.filename}`,
              ContentType: file.mimetype,
            })
            .promise();

          return new Promise((resolve, reject) => {
            if (Location) {
              resolve(Location);
            } else {
              reject(undefined);
            }
          })
            .then((url) => {
              url && imgLinks.push(url as string);
              console.log(imgLinks);
            })
            .then(async () => {
              // fix repetitive code
              try {
                await SkateSpot.insert({
                  name,
                  city,
                  state,
                  street,
                  imageUrls: imgLinks ? JSON.stringify(imgLinks.filter((img) => img !== undefined)) : undefined,
                });

                return true;
              } catch (err) {
                console.error(err);
                return false;
              }
            });
        });
      });

    try {
      await SkateSpot.insert({
        name,
        city,
        state,
        street,
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Query(() => [SkateSpot])
  @UseMiddleware(isAuth)
  async getSkateSpots() {
    const skateSpots = await SkateSpot.find();

    // sorting because when updating skatespot reviews, skatespot gets repositioned in query
    return skateSpots.sort((a, b) => a.id - b.id);
  }

  @Query(() => [SkateSpot])
  // @UseMiddleware(isAuth)
  async search(
    @Arg('query') query: string,
    // @Arg('find') find: string,
    // @Arg('near') near: string
  ) {
    try {
      return await getConnection()
        .createQueryBuilder(SkateSpot, 'skatespots')
        .where('document_with_weights @@ plainto_tsquery(:query)', {
          query,
        })
        .orderBy('ts_rank(document_with_weights, plainto_tsquery(:query))', 'DESC')
        .getMany();
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

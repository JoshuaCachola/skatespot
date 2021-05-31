import { Arg, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { SkateSpot } from './entity/SkateSpot';
import { isAuth } from './utils/isAuth';
import { GraphQLUpload } from 'graphql-upload';
import { getGeocoding } from './utils/geocoding';
import { Upload } from './types/Upload';
import { FindManyOptions, getConnection, MoreThan } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { s3MultipleUpload } from './utils/s3Upload';

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
    @Arg('categoryName') categoryName: string,
    @Arg('imgFiles', () => [GraphQLUpload], { nullable: true }) imgFiles?: [Upload],
  ): Promise<boolean> {
    const skateSpot = await SkateSpot.findOne({ where: { name } });
    if (skateSpot) {
      return false;
    }

    const location = await getGeocoding(street, city, state);

    let imgLinks: Array<string> = [];
    if (imgFiles?.length) {
      Promise.all(imgFiles).then((files) => {
        files.forEach(async (file) => {
          const { Location } = await s3
            .upload({
              Body: file.createReadStream(),
              Key: `${uuidv4()}`,
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
            })
            .then(async () => {
              try {
                await SkateSpot.insert({
                  name,
                  city,
                  state,
                  street,
                  categoryName,
                  location,
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
    } else {
      try {
        await SkateSpot.insert({
          name,
          city,
          state,
          street,
          categoryName,
          location,
        });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return true;
  }

  @Query(() => [SkateSpot])
  async getSkateSpots(
    @Arg('cursor', () => Int, { nullable: true }) cursor: number,
    @Arg('limit', () => Int, { nullable: true }) limit: number,
  ) {
    const options: FindManyOptions<SkateSpot> = {
      order: { id: 'ASC' },
    };

    if (limit) {
      options.take = limit;
    }

    if (cursor) {
      options.where = { id: MoreThan(cursor) };
    }
    return await SkateSpot.find(options);
  }

  @Query(() => SkateSpot)
  @UseMiddleware(isAuth)
  async getSkateSpot(@Arg('name') name: string) {
    try {
      return await SkateSpot.findOne({ where: { name } });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  @Query(() => [SkateSpot])
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

  @Mutation(() => SkateSpot)
  async uploadPhotos(
    @Arg('skateSpotId', () => Int) skateSpotId: number,
    @Arg('imgFiles', () => [GraphQLUpload]) imgFiles: [Upload],
  ): Promise<SkateSpot | null> {
    const skateSpot = await SkateSpot.findOne({ where: { id: skateSpotId } });

    if (!skateSpot) {
      return null;
    }

    let imgLinks: Array<string> = [];

    await s3MultipleUpload(imgFiles, imgLinks);

    setTimeout(async () => {
      try {
        const imageUrls = JSON.parse(skateSpot.imageUrls);
        skateSpot.imageUrls = JSON.stringify([...imageUrls, ...imgLinks]);
        await skateSpot.save();
        return;
      } catch (err) {
        console.error(err);
        return;
      }
    }, 1000);

    return await new Promise((res) => {
      setTimeout(() => res(skateSpot), 2000);
    });
  }
}

import { GraphQLUpload } from 'graphql-upload';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Review } from './entity/Review';
import { isAuth } from './utils/isAuth';
import { Upload } from './types/Upload';
import { User } from './entity/User';
import { SkateSpot } from './entity/SkateSpot';

const s3 = require('./config/s3');

@Resolver()
export class ReviewResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createReview(
    @Arg('review') review: string,
    @Arg('skateSpotId') skateSpotId: number,
    @Arg('userId') userId: number,
    @Arg('rating') rating: string,
    @Arg('imgFiles', () => [GraphQLUpload], { nullable: true }) imgFiles?: [Upload],
  ) {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      console.log('no user');
      return false;
    }

    const skateSpot = await SkateSpot.findOne({ where: { id: skateSpotId } });

    if (!skateSpot) {
      console.log('no skateSpot');
      return false;
    }

    const updatedReviewsDistribution = JSON.parse(skateSpot.reviewsDistribution);
    // why?
    const updatedReviewsCount = Math.floor(skateSpot.reviewsCount) + 1;

    updatedReviewsDistribution[rating] += 1;
    skateSpot.reviewsCount = updatedReviewsCount;
    skateSpot.reviewsDistribution = updatedReviewsDistribution;
    await skateSpot.save();

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
                await Review.insert({
                  review,
                  skateSpot,
                  user,
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
      await Review.insert({
        review,
        skateSpot,
        user,
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

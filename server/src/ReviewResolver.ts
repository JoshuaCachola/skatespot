import { GraphQLUpload } from 'graphql-upload';
import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { Review } from './entity/Review';
import { isAuth } from './utils/isAuth';
import { Upload } from './types/Upload';
// import { User } from './entity/User';
import { SkateSpot } from './entity/SkateSpot';
import { User } from './entity/User';

const s3 = require('./config/s3');

const ratingKeys: any = {
  '1': 'oneStar',
  '2': 'twoStar',
  '3': 'threeStar',
  '4': 'fourStar',
  '5': 'fiveStar',
};

@Resolver(() => Review)
export class ReviewResolver {
  @Query(() => [Review])
  @UseMiddleware(isAuth)
  async getSkateSpotReviews(@Arg('skateSpotId', () => Int) skateSpotId: number): Promise<Array<Review>> {
    try {
      return await Review.find({ where: { skateSpotId } });
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  @Query(() => [Review])
  @UseMiddleware(isAuth)
  async getUserReviews(@Arg('userId', () => Int) userId: number): Promise<Array<Review>> {
    try {
      return await Review.find({ where: { userId } });
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createReview(
    @Arg('review') review: string,
    @Arg('skateSpotId', () => Int) skateSpotId: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('rating', () => Int) rating: number,
    @Arg('imgFiles', () => [GraphQLUpload], { nullable: true }) imgFiles?: [Upload],
  ) {
    // const user = await User.findOne({ where: { id: userId } });

    // if (!user) {
    //   console.log('user');
    //   return false;
    // }

    // {\"oneStar\":18,\"twoStar\":3,\"threeStar\":14,\"fourStar\":17,\"fiveStar\":27}",
    const skateSpot = await SkateSpot.findOne({ where: { id: skateSpotId } });

    if (!skateSpot) {
      console.log('skateSpot');
      return false;
    }

    const updatedReviewsDistribution = JSON.parse(skateSpot.reviewsDistribution);

    // why?

    const updatedReviewsCount = Math.floor(skateSpot.reviewsCount) + 1;
    updatedReviewsDistribution[ratingKeys[rating]] += 1;
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
                  skateSpotId,
                  userId,
                  rating,
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
        skateSpotId,
        userId,
        rating,
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @FieldResolver()
  async skateSpot(@Root() review: Review) {
    return await SkateSpot.findOne({ where: { id: review.skateSpotId } });
  }

  @FieldResolver()
  async user(@Root() review: Review) {
    return await User.findOne({ where: { id: review.userId } });
  }
}

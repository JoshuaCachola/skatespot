import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { SkateSpot } from "./entity/SkateSpot";
import { isAuth } from "./utils/isAuth";

@Resolver()
export class SkateSpotResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSkateSpot(
    @Arg('name') name: string,
    @Arg('address') address: string,
    @Arg('city') city: string,
    @Arg('state') state: string,
    @Arg('imgs', () => [String]) imgs: string,
  ) {
    const skateSpot = await SkateSpot.findOne({ where: { address, city, state }});
    if (skateSpot) {
      return false;
    }

    try {
      await SkateSpot.insert({
        name,
        address,
        city,
        state,
        imgs
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
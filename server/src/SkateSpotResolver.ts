import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { SkateSpot } from "./entity/SkateSpot";
import { isAuth } from "./isAuth";

@Resolver()
export class SkateSpotResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSkateSpot(
    @Arg('name') name: string,
    @Arg('address') address: string,
    @Arg('city') city: string,
    @Arg('state') state: string,
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
        state
      });
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }
};
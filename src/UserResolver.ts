import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import argon2 from 'argon2';
import { User } from './entity/User';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi'
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    try {
      const hashedPassword = await argon2.hash(password);
      await User.insert({
        email,
        password: hashedPassword
      });
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }
}
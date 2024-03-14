import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import { CreateUserType } from "../types/CreateUserType";
import * as UserServices from "../services/user.service";
import * as AuthServices from "../services/auth.service";
import { CustomContext } from "../types/CustomContext";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  @Authorized()
  getUser(@Ctx() ctx: CustomContext): Promise<User | null> {
    const userId = ctx.user.id;
    return UserServices.getUser(userId);
  }

  @Mutation(() => User)
  signUp(
    @Arg("createUserType") createUserType: CreateUserType
  ): Promise<User | Error> {
    return UserServices.createUser(createUserType);
  }

  @Mutation(() => String)
  login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String | Error> {
    return AuthServices.register(email, password);
  }
}

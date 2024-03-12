import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import { CreateUserType } from "../types/CreateUserType";
import * as UserServices from '../services/user.service'
import * as AuthServices from '../services/auth.service';

@Resolver(User)
export class UserResolver {
    @Mutation(() => User)
    signUp(
        @Arg("createUserType") createUserType: CreateUserType
    ): Promise<User | Error>{
        return UserServices.createUser(createUserType);
    }

    @Mutation(() => String)
    login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<String | Error>{
        return AuthServices.register(email, password);
    }
}
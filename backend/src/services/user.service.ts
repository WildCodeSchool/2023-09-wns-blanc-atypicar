import * as argon2 from "argon2";
import { User } from "../entities/user";
import { CreateUserType } from "../types/CreateUserType";

export function getUserByEmail(email: string): Promise<User> {
  return User.findOneByOrFail({ email });
}

export async function createUser(
  createUserType: CreateUserType
): Promise<User | Error> {
  try {
    let user = new User();
    Object.assign(user, createUserType);
    user.password = await argon2.hash(createUserType.password);
    user.creationDate = new Date();
    return user.save();
  } catch (error) {
    return new Error();
  }
}

export function getUser(id: number): Promise<User> {
  return User.findOneByOrFail({ id });
}

import * as argon2 from "argon2";
import { User } from "../entities/user";
import { CreateUserType } from "../types/CreateUserType";
import { UpdateUserType } from "../types/UpdateUserType";


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
    throw new Error();
  }
}

export function getUser(id: number): Promise<User> {
  return User.findOneByOrFail({ id });
}

export async function modifyUser(
  user: UpdateUserType,
  id: number
) {
  const userToUpdate = await getUser(id);

  if (!userToUpdate) {
    throw new Error("user not found");
  }


  if (userToUpdate) {
    userToUpdate.email = user.email;
    userToUpdate.description = user.description;
    userToUpdate.firstName = user.firstName;
    userToUpdate.lastName = user.lastName;
    userToUpdate.picture = user.picture;
    userToUpdate.birthday = user.birthday;
  }

  return userToUpdate.save();

}


export async function getUserProfileInfos(id: number): Promise<User> {
  const user = await User.findOne({
    where: { id: id },
    relations: ['vehicle', 'vehicle.category']
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}


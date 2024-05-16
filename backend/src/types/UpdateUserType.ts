import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  birthday: Date;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  description: string;
}

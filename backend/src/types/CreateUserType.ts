import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserType {
    @Field()
    firstName: string;
  
    @Field()
    lastName: string;

    @Field({ nullable: true })
    birthday?: Date;
  
    @Field()
    email: string;
  
    @Field()
    password: string;
  
    @Field({ defaultValue: "USER" })
    role: "ADMIN" | "USER";
  
    @Field()
    creationDate: Date;
  
    @Field({ defaultValue: false })
    verifiedLicense: false;
  
    @Field({ defaultValue: false })
    verifiedEmail: false;
  
    @Field({ nullable: true })
    picture: string;
  
    @Field({ nullable: true })
    description: string;
  
}
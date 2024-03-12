import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserType {
    @Field()
    firstName: string;
  
    @Field()
    lastName: string;
  
    @Field()
    email: string;
  
    @Field()
    password: string;
  
    @Field()
    role: "ADMIN" | "USER";
  
    @Field()
    creationDate: Date;
  
    @Field()
    verifiedLicense: false;
  
    @Field()
    verifiedEmail: false;
  
    @Field()
    picture?: string;
  
    @Field()
    description?: string;
  
}
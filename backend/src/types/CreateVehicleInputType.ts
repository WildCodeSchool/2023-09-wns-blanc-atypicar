import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateVehicleInputType {
    @Field()
    model: string;

    @Field()
    brand: string;

    @Field({ nullable: true })
    name?: string;

    @Field()
    seats: number;

    @Field()
    picture: string;

    @Field()
    userId: number;

    @Field(() => [Int])
    categoryIds: number[];
}
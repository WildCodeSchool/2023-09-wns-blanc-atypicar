import { Field, InputType } from "type-graphql";

@InputType()
export class CreateJourneyInputType {
  @Field()
  startingPoint: string;

  @Field()
  arrivalPoint: string;

  @Field()
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  availableSeats: number;

  @Field()
  price: number;
}

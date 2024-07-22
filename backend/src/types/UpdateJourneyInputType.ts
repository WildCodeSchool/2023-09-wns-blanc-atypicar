import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateJourneyInputType {
  @Field()
  id: number;

  @Field()
  startingPoint: string;

  @Field()
  arrivalPoint: string;

  @Field()
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  availableSeats: number;

  @Field()
  price: number;
}

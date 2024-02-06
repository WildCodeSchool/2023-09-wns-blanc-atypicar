import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateReservationInputType {
  @Field()
  status: string;

  @Field()
  passenger: number;

  @Field()
  dateTime: Date;

  @Field()
  creationDate: Date;

  @Field()
  seatNumber: number;
}

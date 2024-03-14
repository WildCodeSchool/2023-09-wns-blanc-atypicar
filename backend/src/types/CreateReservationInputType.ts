import { Field, InputType } from "type-graphql";

@InputType()
export class CreateReservationInputType {
  @Field()
  status: string;

  @Field()
  passenger?: number;

  @Field()
  creationDate?: Date;

  @Field()
  seatNumber: number;
}

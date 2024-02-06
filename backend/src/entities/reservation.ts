import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";
import { Journey } from "./journey";

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  status: "VALIDATED" | "CANCELLED";

  @Field(() => Journey)
  @ManyToOne(() => Journey, (journey) => journey.reservation, { onDelete: "CASCADE"})
  journey: Journey;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  passenger?: number;

  @Field()
  @Column()
  dateTime?: Date;

  @Field()
  @Column()
  creationDate: Date;

  @Field()
  @Column()
  seatNumber: number;
}

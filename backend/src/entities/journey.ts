import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";
import { Reservation } from "./reservation";

@ObjectType()
@Entity()
export class Journey extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 155 })
  startingPoint: string;

  @Field()
  @Column({ length: 155 })
  arrivalPoint: string;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field()
  @Column({ type: "integer", nullable: false})
  availableSeats: number;

  @Field()
  @Column()
  price: number;

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, reservation => reservation.journey, { cascade: true, onDelete: "CASCADE" })
  reservation?: Reservation[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.journey)
  driver: User;
}

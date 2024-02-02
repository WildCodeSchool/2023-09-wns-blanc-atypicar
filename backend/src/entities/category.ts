import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Vehicle } from "./vehicles";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  wording: string;

  @Field(() => Vehicle)
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.id)
  vehicle: number;
}

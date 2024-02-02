import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Field, ObjectType } from "type-graphql";
import { User } from "./user";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  wording: string;

  @Field(() => User)
  @ManyToMany(() => User, (user) => user.id)
  user: number;
}

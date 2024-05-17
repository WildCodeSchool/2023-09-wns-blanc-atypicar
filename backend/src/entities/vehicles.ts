 import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";
import { Category } from "./category";

@ObjectType()
@Entity()
export class Vehicle extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 45 })
  model: string;

  @Field()
  @Column({ length: 45 })
  brand: string;

  @Field()
  @Column({ length: 45 })
  name?: string;

  @Field()
  @Column()
  seats: number;

  @Field()
  @Column()
  picture: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.id)
  user: number;

  @Field(() => [Category])
  @ManyToMany(() => Category)
  categories: Category[];
}

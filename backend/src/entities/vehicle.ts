import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  picture: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.vehicle, { nullable: true })
  user: User;



  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, category => category.wording, { nullable: true })
  category: Category;
}

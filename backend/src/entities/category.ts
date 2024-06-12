import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  wording: string;

  @Field()
  @Column()
  creationDate: Date;

  @BeforeInsert()
  updateCreationDate() {
    this.creationDate = new Date();
  }
}

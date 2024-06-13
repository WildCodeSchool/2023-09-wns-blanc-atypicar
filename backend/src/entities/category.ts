import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Vehicle } from "./vehicle";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @OneToMany(() => Vehicle, vehicle => vehicle.category, { nullable: true })
  wording: string;

  @Field()
  @Column()
  creationDate: Date;

  @BeforeInsert()
  updateCreationDate() {
    this.creationDate = new Date();
  }
}

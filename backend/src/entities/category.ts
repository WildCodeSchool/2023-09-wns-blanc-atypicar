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
  wording: string;

  @Field()
  @Column()
  creationDate: Date;

  @OneToMany(() => Vehicle, vehicle => vehicle.category, { onDelete: 'SET NULL' })
  vehicles: Vehicle[];

  @BeforeInsert()
  updateCreationDate() {
    this.creationDate = new Date();
  }
}
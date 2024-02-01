import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag";
import { Vehicle } from "./vehicles";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  role: "ADMIN" | "USER";

  @Field()
  @Column()
  creationDate: Date;

  @Field()
  @Column()
  verifiedLicense: false;

  @Field()
  @Column()
  verifiedEmail: false;

  @Field()
  @Column()
  picture?: string;

  @Field()
  @Column()
  description?: string;

  @Field(() => Tag)
  @ManyToMany(() => Tag, (tag) => tag.id)
  tag: number;

  @Field(() => Vehicle)
  @OneToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle?: number;
}

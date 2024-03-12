import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag";
import { Vehicle } from "./vehicles";
import { Journey } from "./journey";

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
  birthday: Date;

  @Field()
  @Column({ unique: true })
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

  @Field(() => [Journey])
  @OneToMany(() => Journey, journey => journey.driver)
  journey: Journey[];
}

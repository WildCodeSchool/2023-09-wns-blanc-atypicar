import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./vehicle";
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthday: Date;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field({ defaultValue: "USER" })
  @Column()
  role: "ADMIN" | "USER";

  @Field()
  @Column()
  creationDate: Date;

  @Field({ defaultValue: false })
  @Column()
  verifiedLicense: boolean;

  @Field({ defaultValue: false })
  @Column()
  verifiedEmail: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Vehicle, { nullable: true })
  @OneToOne(() => Vehicle, vehicle => vehicle.user, { nullable: true })
  vehicle?: Vehicle;

  @Field(() => [Journey])
  @OneToOne(() => Journey, (journey) => journey.driver)
  journey: Journey[];
}

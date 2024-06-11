import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  BeforeInsert
} from "typeorm";
import { Tag } from "./tag";
import { Vehicle } from "./vehicles";
import { Journey } from "./journey";
import { Conversation } from "./conversations";

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

  @Field(() => Tag)
  @ManyToMany(() => Tag, (tag) => tag.id)
  tag: number;

  @Field(() => Vehicle)
  @OneToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle?: number;

  @Field(() => [Journey])
  @OneToMany(() => Journey, (journey) => journey.driver)
  journey: Journey[];

  @Field(() => [Conversation])
  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  conversations: Conversation[];

  @BeforeInsert()
  updateCreationDate() {
      this.creationDate = new Date();
  }
}

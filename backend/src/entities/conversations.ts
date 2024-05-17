import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Message } from "./message";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable()
  participants: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];
}

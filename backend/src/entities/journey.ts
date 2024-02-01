import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType()
@Entity()
export class Journey extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @OneToMany(() => User, (user) => user.id)
  driver: number;

  @Field()
  @Column({ length: 155 })
  startingPoint: string;

  @Field()
  @Column({ length: 155 })
  arrivalPoint: string;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field()
  @Column()
  availableSeats: number;

  @Field()
  @Column()
  price: number;

  constructor(datas: {
    startingPoint: string,
    arrivalPoint: string,
    description: string,
    startDate: Date,
    endDate: Date, 
    availableSeats: number,
    price: number
  }| null = null){
    super();
    if(datas) {
      this.startingPoint = datas.startingPoint;
      this.arrivalPoint = datas.arrivalPoint;
      this.description = datas.description;
      this.startDate = datas.startDate;
      this.endDate = datas.endDate;
      this.availableSeats = datas.availableSeats;
      this.price = datas.price;
    }
  }
}

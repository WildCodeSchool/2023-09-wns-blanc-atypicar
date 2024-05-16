import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Category } from "../entities/category";
import { Journey } from "../entities/journey";
import { Reservation } from "../entities/reservation";
import { Tag } from "../entities/tag";
import { User } from "../entities/user";
import { Vehicle } from "../entities/vehicles";
import { Message } from "../entities/message";
import { Conversation } from "../entities/conversations";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Category,
    Journey,
    Reservation,
    Tag,
    User,
    Vehicle,
    Message,
    Conversation,
  ],
  logging: true,
  synchronize: true,
});

import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Category } from "../entities/category";
import { Journey } from "../entities/journey";
import { Reservation } from "../entities/reservation";
import { User } from "../entities/user";
import { Vehicle } from "../entities/vehicle";

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
    User,
    Vehicle,
  ],
  logging: true,
  synchronize: false,
  migrations: ["migrations/*.{ts,js}"],
});

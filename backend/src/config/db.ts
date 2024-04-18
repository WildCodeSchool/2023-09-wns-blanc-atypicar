import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_DB as string),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true,
});

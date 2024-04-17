import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "atypicar",
  password: "password",
  database: "atypicardb",
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true,
});

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStructure1721661744059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "category" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL,
            "description" TEXT NOT NULL
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "journey" (
            "id" SERIAL PRIMARY KEY,
            "start" VARCHAR(255) NOT NULL,
            "destination" VARCHAR(255) NOT NULL,
            "date" DATE NOT NULL,
            "time" TIME NOT NULL,
            "price" DECIMAL NOT NULL,
            "seats" INTEGER NOT NULL,
            "description" TEXT NOT NULL,
            "vehicleId" INTEGER NOT NULL,
            "userId" INTEGER NOT NULL
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" (
            "id" SERIAL PRIMARY KEY,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            "birthday" DATE,
            "email" VARCHAR(255) NOT NULL UNIQUE,
            "password" VARCHAR(255) NOT NULL,
            "role" VARCHAR(255) NOT NULL CHECK (role IN ('ADMIN', 'USER')),
            "creationDate" TIMESTAMP NOT NULL,
            "verifiedLicense" BOOLEAN DEFAULT FALSE,
            "verifiedEmail" BOOLEAN DEFAULT FALSE,
            "picture" VARCHAR(255),
            "description" TEXT,
            "vehicleId" INTEGER,
            CONSTRAINT "FK_vehicle" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id")
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "vehicle" (
            "id" SERIAL PRIMARY KEY,
            "model" VARCHAR(45) NOT NULL,
            "brand" VARCHAR(45) NOT NULL,
            "name" VARCHAR(45),
            "seats" INTEGER NOT NULL,
            "picture" VARCHAR(255),
            "userId" INTEGER,
            "categoryId" INTEGER,
            CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "user"("id"),
            CONSTRAINT "FK_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "reservation" (
            "id" SERIAL PRIMARY KEY,
            "status" VARCHAR(255) NOT NULL CHECK (status IN ('VALIDATED', 'CANCELLED')),
            "journeyId" INTEGER NOT NULL,
            "passengerId" INTEGER,
            "creationDate" TIMESTAMP NOT NULL,
            "seatNumber" INTEGER NOT NULL,
            CONSTRAINT "FK_journey" FOREIGN KEY ("journeyId") REFERENCES "journey"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_passenger" FOREIGN KEY ("passengerId") REFERENCES "user"("id")
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "reservation";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "vehicle";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "journey";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "category";`);
    }
}
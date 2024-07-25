import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategories1721662184923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "category" ("wording", "creationDate") VALUES ('Luxe', NOW());`);
        await queryRunner.query(`INSERT INTO "category" ("wording", "creationDate") VALUES ('Ecolo',  NOW());`);
        await queryRunner.query(`INSERT INTO "category" ("wording", "creationDate") VALUES ('Collection',  NOW());`);
        await queryRunner.query(`INSERT INTO "category" ("wording", "creationDate") VALUES ('Limousine',  NOW());`);
        await queryRunner.query(`INSERT INTO "category" ("wording", "creationDate") VALUES ('Art',  NOW());`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "category" WHERE "wording" = 'Luxe';`);
        await queryRunner.query(`DELETE FROM "category" WHERE "wording" = 'Ecolo';`);
        await queryRunner.query(`DELETE FROM "category" WHERE "wording" = 'Collection';`);
        await queryRunner.query(`DELETE FROM "category" WHERE "wording" = 'Limousine';`);
        await queryRunner.query(`DELETE FROM "category" WHERE "wording" = 'Art';`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class fixFieldDescription1677337706188 implements MigrationInterface {
    name = 'fixFieldDescription1677337706188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "description" character varying NOT NULL`);
    }

}

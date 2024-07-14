import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedATUpdatedAtDeletdAtOnAllTables1720934550546 implements MigrationInterface {
    name = 'AddCreatedATUpdatedAtDeletdAtOnAllTables1720934550546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kycs" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "kycs" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "kycs" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "token_blacklist" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token_blacklist" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token_blacklist" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token_blacklist" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "token_blacklist" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "token_blacklist" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "kycs" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "kycs" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "kycs" DROP COLUMN "created_at"`);
    }

}

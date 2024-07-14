import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersProfilesKycsAndTokenBlaclistsTables1720891876769 implements MigrationInterface {
    name = 'CreateUsersProfilesKycsAndTokenBlaclistsTables1720891876769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "address" character varying, "profile_image" character varying, "phone" character varying, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kycs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "is_email_verified" boolean NOT NULL DEFAULT false, "is_phone_verified" boolean NOT NULL DEFAULT false, "is_ID_verified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6e61a5975007a8dae889765bbbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CLIENT', "kycId" uuid, "profileId" uuid, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_8d7891ecc41ac3858a5f477afc" UNIQUE ("kycId"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token_blacklist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, CONSTRAINT "PK_3e37528d03f0bd5335874afa48d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8d7891ecc41ac3858a5f477afc7" FOREIGN KEY ("kycId") REFERENCES "kycs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8d7891ecc41ac3858a5f477afc7"`);
        await queryRunner.query(`DROP TABLE "token_blacklist"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "kycs"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}

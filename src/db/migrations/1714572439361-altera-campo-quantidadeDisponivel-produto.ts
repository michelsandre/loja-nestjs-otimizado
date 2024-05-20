import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraCampoQuantidadeDisponivelProduto1714572439361 implements MigrationInterface {
    name = 'AlteraCampoQuantidadeDisponivelProduto1714572439361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidade_disponivel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade_disponivel" TO "quantidade"`);
    }

}

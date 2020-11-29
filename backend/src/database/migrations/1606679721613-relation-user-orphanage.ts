import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class relationUserOrphanage1606679721613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'creator_id',
            type: 'integer'
        }))
        await queryRunner.createForeignKey('orphanages', new TableForeignKey({
            name: 'OrphanageUser',
            columnNames: ['creator_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'creator_id')
        await queryRunner.dropForeignKey('orphanages', 'OrphanageUser')
    }
}

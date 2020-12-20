import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"
import { UserRole } from "../../models/Users"

export class userRole1608483261322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'role',
            type: 'enum',
            enum: [...Object.values(UserRole)],
            default: `'${UserRole.USER}'`,
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'role')
    }

}
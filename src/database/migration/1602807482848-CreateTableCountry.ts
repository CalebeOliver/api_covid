import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCountry1602807482848 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'countries',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: '_id',
						type: 'int',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'initials',
						type: 'varchar',
					},
					{
						name: 'flag',
						type: 'varchar',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('countries');
	}
}

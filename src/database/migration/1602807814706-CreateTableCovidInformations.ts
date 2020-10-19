import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateTableCovidInformations1602807814706 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name:'covid_informations',
			columns:[
				{
					name: 'id',
					type: 'varchar',
					isPrimary: true,
					generationStrategy: 'uuid',
					default: 'uuid_generate_v4()',
				},
				{
					name: 'cases',
					type: 'int',
				},
				{
					name: 'deaths',
					type: 'int',
				},
				{
					name: 'recovered',
					type: 'varchar',
				},
				{
					name: 'active',
					type: 'varchar',
				},
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('covid_informations');
	}

}

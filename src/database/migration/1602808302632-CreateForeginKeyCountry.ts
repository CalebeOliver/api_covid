import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class CreateForeginKeyCountry1602808302632
implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'countries',
			new TableColumn({
				name: 'covid_information_id',
				type: 'varchar',
				isNullable: true,
			})
		);

		await queryRunner.createForeignKey(
			'countries',
			new TableForeignKey({
				name: 'covid_informations_country',
				columnNames: ['covid_information_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'covid_informations',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('countries', 'covid_informations_country');
		await queryRunner.dropColumn('coutries', 'covid_informations_id');
	}
}

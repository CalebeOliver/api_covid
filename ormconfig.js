const extension = process.env.NODE_ENV === 'production' ? 'js' : 'ts';
const root = process.env.NODE_ENV === 'production' ? 'build/' : '';

const {
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_NAME,
	DB_PASSWORD
} = process.env;

module.exports = {
	type: 'mysql',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	synchronize: true,
	logging: 'error',
	entities: [root + 'src/models/**/*.' + extension],
	migrations: [root + 'src/migrations/**/*.' + extension],
	subscribers: [root + 'src/subscriber/**/*.' + extension],
	cli: {
		'entitiesDir': root + 'src/models',
		'migrationsDir': root + 'src/database/migration',
		'subscribersDir': root + 'src/subscriber'
	}
};

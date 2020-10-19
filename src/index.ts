import 'reflect-metadata';
import { createConnection } from 'typeorm';
import 'dotenv/config';

import server from './server';
import updateCovidInformationsCountry from './services/updateCovidInformationsCountry';

createConnection();

const update = new updateCovidInformationsCountry();

update.execute();

setInterval(() => update.execute(), 60 * 1000 * 60);

server.listen(process.env.SERVER_PORT, () => console.log('🚀 rodando na porta 3333'));

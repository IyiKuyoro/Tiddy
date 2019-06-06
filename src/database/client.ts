import { Client } from 'pg';

import config from '../config';

const client = new Client({
  database: config.DATABASE,
  host: config.DATABASE_HOST,
  password: config.DATABASE_PASSWORD,
  port: 5432,
  user: config.DATABASE_USERNAME,
});

client.connect();

export default client;

import { Client } from 'pg';

import config from '../../config';
import { Logger } from '../../helpers/logger';

const client = new Client({
  database: config.DATABASE,
  host: config.DATABASE_HOST,
  password: config.DATABASE_PASSWORD,
  port: 5432,
  user: config.DATABASE_USERNAME,
});

client.connect();

const dropTable = `
DO $$ DECLARE
  r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;
`;

client
  .query(dropTable)
  .then(() => {
    Logger.info('Un-migration successful');
    process.exit(0);
    client.end();
  })
  .catch(e => {
    Logger.error(e);
    process.exit(1);
  });

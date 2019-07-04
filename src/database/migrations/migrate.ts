import fs from 'fs';
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

const createMetaTable =
  'CREATE TABLE IF NOT EXISTS meta (migration_id serial PRIMARY KEY, migration_file VARCHAR (50) UNIQUE NOT NULL);';
const getMigrationsText = 'SELECT * FROM meta;';
const migratedFiles: string[] = [];

const handleErrors = (e: Error) => {
  Logger.error(e);
  process.exit(1);
};

const closeConnection = () => {
  process.exit(0);
  client.end();
};

const successfulMigration = (file: string) => {
  const text = 'INSERT INTO meta(migration_file) VALUES($1);';

  client
    .query({
      text,
      values: [file.replace(/.[a-z]+$/, '')],
    })
    .then(() => {
      Logger.info(`${file} migration successfully ran.`);
      closeConnection();
    })
    .catch(handleErrors);
};

const executeSQL = (err: Error, data: string, file: string) => {
  if (err) {
    Logger.error(err);
    process.exit(1);
  }

  client
    .query(data)
    .then(() => successfulMigration(file))
    .catch(handleErrors);
};

const runMigrations = () => {
  fs.readdir(`${process.cwd()}/src/database/migrations`, (err, items) => {
    if (err) {
      handleErrors(err);
    }

    if (items.length <= 0) {
      Logger.info('There are no migrations to run.');
      closeConnection();
    }

    items.forEach((file: string, index: number) => {
      const extension = file.substr(file.lastIndexOf('.'), file.length - file.lastIndexOf('.'));
      const fileName = file.replace(/.[a-z]+$/, '');

      if (migratedFiles.indexOf(fileName) < 0 && extension === '.sql') {
        Logger.info(`Running: ${process.cwd()}/src/database/migrations/${file}`);
        fs.readFile(`${process.cwd()}/src/database/migrations/${file}`, 'utf8', (error: Error, data: string) =>
          executeSQL(error, data, file),
        );
      } else if (extension === '.sql') {
        Logger.info('Migrations are up to date!');
        closeConnection();
      }
    });
  });
};

const saveMigratedFiles = (data: any) => {
  if (data.rows.length > 0) {
    data.rows.forEach((record: any) => {
      migratedFiles.push(record.migration_file);
    });
  }

  runMigrations();
};

const getPastMigrations = () => {
  client
    .query(getMigrationsText)
    .then(saveMigratedFiles)
    .catch(handleErrors);
};

client
  .query(createMetaTable)
  .then(getPastMigrations)
  .catch(handleErrors);

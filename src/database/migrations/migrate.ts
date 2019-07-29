import fs from 'fs';
import { Client } from 'pg';
import util from 'util';

import config from '../../config';
import { Logger } from '../../helpers/logger';

const readdir = util.promisify(fs.readdir);

const client = new Client({
  database: config.DATABASE,
  host: config.DATABASE_HOST,
  password: config.DATABASE_PASSWORD,
  port: 5432,
  ssl: config.ENV === 'production' ? true : false,
  user: config.DATABASE_USERNAME,
});

client.connect();

const createMetaTable =
  'CREATE TABLE IF NOT EXISTS meta (migration_id serial PRIMARY KEY, migration_file VARCHAR (50) UNIQUE NOT NULL);';
const migratedFiles: string[] = [];

const handleErrors = (e: Error) => {
  Logger.error(e);
  client.end();
  process.exit(1);
};

const closeConnection = () => {
  process.exit(0);
  client.end();
};

// Save the already run migration in the meta table and inform the user then call the next migration or close the connection
const successfulMigration = async (files: string[], index: number, nextMigration: any) => {
  try {
    const text = 'INSERT INTO meta(migration_file) VALUES($1);';

    const res = await client.query({
      text,
      values: [files[index].replace(/.[a-z]+$/, '')],
    });

    if (res) {
      Logger.info(`${files[index]} migration successfully ran.`);
    }

    if (index === files.length - 1) {
      Logger.info('\nMigrations are up to date!\n');
      closeConnection();
    } else {
      nextMigration(files, ++index, nextMigration);
    }
  } catch (error) {
    handleErrors(error);
  }
};

// Execute the sql query in the file
const executeSQL = (files: string[], index: number, next: any) => {
  // Read the contents of the file
  fs.readFile(
    `${process.cwd()}/src/database/migrations/${files[index]}`,
    'utf8',
    async (error: Error, query: string) => {
      try {
        if (error) {
          throw error;
        }

        const fileName = files[index].replace(/.[a-z]+$/, '');
        if (migratedFiles.indexOf(fileName) < 0) {
          // Run the migrations
          const res = await client.query(query);

          if (res) {
            await successfulMigration(files, index, next);
          }
        } else {
          // If no migrations were found
          Logger.info('\nMigrations are up to date!\n');
          closeConnection();
        }
      } catch (error) {
        handleErrors(error);
      }
    },
  );
};

// Run new migrations
const runMigrations = async () => {
  try {
    // Read all files from the migrations directory
    const files = await readdir(`${process.cwd()}/src/database/migrations`);

    // Extract only sql files
    const filteredFiles = files.filter((value: string) => /.sql$/.test(value));

    // If there are no sql files to run, tell the user
    if (filteredFiles.length <= 0) {
      Logger.info('There are no migrations to run.');
      closeConnection();
    }

    // Execute the sql query in the first file and recurs if there are more files to run
    executeSQL(filteredFiles, 0, executeSQL);
  } catch (error) {
    handleErrors(error);
  }
};

// Save all migrated files and run new migrations
const saveMigratedFiles = async (data: any) => {
  if (data.rows.length > 0) {
    data.rows.forEach((record: any) => {
      migratedFiles.push(record.migration_file);
    });
  }

  await runMigrations();
};

// Get all already run migrations
const getPastMigrations = async () => {
  try {
    const res = await client.query('SELECT * FROM meta;');

    if (res) {
      saveMigratedFiles(res);
    }
  } catch (error) {
    handleErrors(error);
  }
};

// Create the migration meta table
client
  .query(createMetaTable)
  .then(getPastMigrations)
  .catch(handleErrors);

import config from '../config';

module.exports = {
  test: {
    dialect: 'postgres',
    driver: 'pg',
    database: config.DATABASE,
    username: config.DATABASE_USERNAME,
    host: config.DATABASE_HOST,
    password: null,
    port: 5432,
  },
  development: {
    dialect: 'postgres',
    driver: 'pg',
    database: config.DATABASE,
    username: config.DATABASE_USERNAME,
    host: config.DATABASE_HOST,
    password: config.DATABASE_PASSWORD,
    port: 5432,
  },
  production: {
    dialect: 'postgres',
    driver: 'pg',
    database: config.DATABASE,
    username: config.DATABASE_USERNAME,
    host: config.DATABASE_HOST,
    password: config.DATABASE_PASSWORD,
    port: 5432,
  },
}

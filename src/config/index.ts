import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        DATABASE: process.env.TEST_DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        PORT: process.env.PORT,
        SLACK_CLIENT_ID: 111111111111.111111111111,
        SLACK_CLIENT_SECRET: 11111111111111111111111111111111,
      };
    }
    case 'production': {
      return {
        DATABASE: process.env.PROD_DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        ENV: 'production',
        LOGGER_SUBDOMAIN: process.env.LOGGER_SUBDOMAIN,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
        SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
        SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
      };
    }
    default: {
      return {
        DATABASE: process.env.DEV_DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        ENV: 'development',
        LOGGER_SUBDOMAIN: process.env.LOGGER_SUBDOMAIN,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
        SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
        SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
      };
    }
  }
};

export default config();

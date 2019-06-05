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
      };
    }
    case 'production': {
      return {
        DATABASE: process.env.PROD_DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        ENV: 'production',
        LOGGER_REGION: process.env.LOGGER_REGION,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
      };
    }
    default: {
      return {
        DATABASE: process.env.DEV_DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        ENV: 'development',
        LOGGER_REGION: process.env.LOGGER_REGION,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
      };
    }
  }
};

export default config();

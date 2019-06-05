import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        DATABASE: process.env.DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        PORT: process.env.PORT,
        SLACK_CLIENT_ID: 123456789102.123456789012,
        SLACK_CLIENT_SECRET: '342b24gv78237h6gu2k83742133s32',
      };
    }
    case 'production': {
      return {
        DATABASE: process.env.DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        ENV: 'production',
        LOGGER_REGION: process.env.LOGGER_REGION,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
        SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
        SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
      };
    }
    default: {
      return {
        DATABASE: process.env.DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        ENV: 'development',
        LOGGER_REGION: process.env.LOGGER_REGION,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
        SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
        SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
      };
    }
  }
};

export default config();

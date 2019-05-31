import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        PORT: process.env.PORT,
      };
    }
    case 'production': {
      return {
        ENV: 'production',
        LOGGER_REGION: process.env.LOGGER_REGION,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
      };
    }
    default: {
      return {
        ENV: 'development',
        LOGGER_REGION: process.env.LOGGER_REGION,
        LOGGER_TOKEN: process.env.LOGGER_TOKEN,
        PORT: process.env.PORT,
      };
    }
  }
};

export default config();

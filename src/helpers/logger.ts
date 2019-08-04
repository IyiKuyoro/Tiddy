import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';

import config from '../config';

winston.add(
  new Loggly({
    json: true,
    subdomain: config.LOGGER_SUBDOMAIN,
    tags: ['Winston-NodeJS'],
    token: config.LOGGER_TOKEN,
  }),
);

export class Logger {
  public static info(msg: string): void {
    if (config.ENV === 'production') {
      console.log(msg);
      winston.log('info', msg);
    } else {
      // tslint:disable-next-line:no-console
      console.log(msg);
    }
  }

  public static error(error: Error): void {
    if (config.ENV === 'production') {
      console.log(error);
      winston.log('error', error.message, error);
    } else {
      // tslint:disable-next-line:no-console
      console.log(error);
    }
  }
}

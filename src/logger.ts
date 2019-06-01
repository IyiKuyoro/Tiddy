import Rapid7 from 'r7insight_node';

import config from './config';

const log = new Rapid7({
  region: config.LOGGER_REGION,
  token: config.LOGGER_TOKEN,
});

export class Logger {
  public static info(msg: string): void {
    if (config.ENV === 'production') {
      log.info(msg);
    } else {
      // tslint:disable-next-line:no-console
      console.log(msg);
    }
  }
}

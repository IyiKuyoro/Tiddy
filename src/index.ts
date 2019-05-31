import http from 'http';

import config from './config';
import { Logger } from './logger';

import app from './app';

const server = http.createServer(app);

const PORT = config.PORT || 3000;
server.listen(PORT, () => {
  Logger.info(`Server is running in http://localhost:${PORT}`);
});

export default app;

import http from 'http';

import config from './config';
import { Logger } from './helpers/logger';

import app from './app';

const server = http.createServer(app);

const PORT = config.PORT || 3000;
server.listen(PORT, () => {
  Logger.info(`Tiddy server is running at http://localhost:${PORT}`);
});

export default app;

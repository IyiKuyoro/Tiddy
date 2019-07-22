import { Router } from 'express';

import slackRouter from './slack';
import webRouter from './web';

const router = Router();

router.use('/', webRouter);
router.use('/slack', slackRouter);

export default router;

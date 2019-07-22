import { Router } from 'express';

import webRouter from './web';
import slackRouter from './slack';

const router = Router();

router.use('/', webRouter);
router.use('/slack', slackRouter);

export default router;

import { Router } from 'express';

import webRouter from './web';

const router = Router();

router.use('/', webRouter);

export default router;

import { Router } from 'express';
import WebController from '../controllers/WebControllers';

const webRouter = Router();

webRouter.get('/', WebController.RenderHomePage)
webRouter.get('/privacy', WebController.RenderPrivacyPage)
webRouter.get('/support', WebController.RenderSupportPage)

export default webRouter;

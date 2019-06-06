import { Router } from 'express';
import WebController from '../controllers/WebControllers';

const webRouter = Router();

webRouter.get('/', WebController.RenderHomePage);
webRouter.get('/install', WebController.InstallRedirect);
webRouter.get('/privacy', WebController.RenderPrivacyPage);
webRouter.get('/support', WebController.RenderSupportPage);
webRouter.get('/auth/authorize', WebController.Authorize);

export default webRouter;

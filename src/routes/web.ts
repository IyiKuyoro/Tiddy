import { Router } from 'express';
import WebController from '../controllers/web/WebControllers';

const webRouter = Router();

// Handle home page request
webRouter.get('/', WebController.RenderHomePage);

// Handle install page request
webRouter.get('/install', WebController.InstallRedirect);

// Handle privacy page request
webRouter.get('/privacy', WebController.RenderPrivacyPage);

// Handle support page request
webRouter.get('/support', WebController.RenderSupportPage);

// Handle auth page request
webRouter.get('/auth/authorize', WebController.Authorize);

export default webRouter;

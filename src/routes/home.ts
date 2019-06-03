import { Router } from 'express';
import HomeController from '../controllers/HomeControllers';

const homeRouter = Router();

homeRouter.get('/', HomeController.RenderHomePage)

export default homeRouter;

import { Router } from 'express';
import SlashCommandsControllers from '../controllers/SlashCommands';

const slackRouter = Router();

slackRouter.post(
  '/commands',
  SlashCommandsControllers.defaultCommand,
);

export default slackRouter;

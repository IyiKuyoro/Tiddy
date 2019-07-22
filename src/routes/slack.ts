import { Router } from 'express';

import slackEvents from '../controllers/SlackEvents';
import SlashCommandsControllers from '../controllers/SlashCommands';

const slackRouter = Router();

slackRouter.post(
  '/commands',
  SlashCommandsControllers.defaultCommand,
);
slackRouter.use('/events', slackEvents.expressMiddleware());

export default slackRouter;

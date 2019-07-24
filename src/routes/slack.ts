import { Router } from 'express';

import slackEvents from '../controllers/SlackEvents';
import slackInteractions from '../controllers/SlackInteractiveMessage';
import SlashCommandsControllers from '../controllers/SlashCommands';

const slackRouter = Router();

// Receive slack commands
slackRouter.post(
  '/commands',
  SlashCommandsControllers.defaultCommand,
);

// Receive slack events
slackRouter.use('/events', slackEvents.expressMiddleware());

// Receive interactive actions
slackRouter.post('/actions', slackInteractions.requestListener());

export default slackRouter;

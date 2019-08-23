import { Router } from 'express';

import SlashCommandsControllers from '../../controllers/slack/SlashCommands';
import { parseCommandBody } from './Helpers';
import slackEvents from './SlackEvents';
import slackInteractions from './SlackInteractiveMessage';

const slackRouter = Router();

// Receive slack commands
slackRouter.post(
  '/commands',
  parseCommandBody,
  SlashCommandsControllers.routeCommand
);

// Receive slack events
slackRouter.use('/events', slackEvents.expressMiddleware());

// Receive interactive actions
slackRouter.post('/actions', slackInteractions.requestListener());

export default slackRouter;

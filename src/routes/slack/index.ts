import { Router } from 'express';

import SlashCommandsControllers from '../../controllers/SlashCommands';
import slackEvents from './SlackEvents';
import slackInteractions from './SlackInteractiveMessage';

const slackRouter = Router();

// Receive slack commands
slackRouter.post('/commands', SlashCommandsControllers.defaultCommand);

// Receive slack events
slackRouter.use('/events', slackEvents.expressMiddleware());

// Receive interactive actions
slackRouter.post('/actions', slackInteractions.requestListener());

export default slackRouter;

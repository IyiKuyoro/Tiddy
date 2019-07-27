import { createEventAdapter } from '@slack/events-api';

import config from '../../config';
import EventControllers from '../../controllers/slack/EventControllers';

const slackEvents = createEventAdapter(config.SLACK_SIGNING_SECRET);

// Handle added reactions
slackEvents.on('reaction_added', EventControllers.reactionAdded);

// Handle removed reactions
slackEvents.on('reaction_removed', EventControllers.reactionRemoved);

export default slackEvents;

import { createEventAdapter } from '@slack/events-api';

import config from '../config';

const slackEvents = createEventAdapter(config.SLACK_SIGNING_SECRET);

// Listen for added reactions
slackEvents.on('reaction_added', (event: any)=> {
  // Verify that that channel has been added for watch
  console.log();
  console.log(event);
  console.log();
});

// Listen for removed reactions
slackEvents.on('reaction_removed', (event: any)=> {
  // Verify that that channel has been added for watch
  console.log();
  console.log(event);
  console.log();
});

export default slackEvents;

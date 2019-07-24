import { createMessageAdapter } from '@slack/interactive-messages';

import config from '../config';

const slackInteractions = createMessageAdapter(config.SLACK_SIGNING_SECRET);

slackInteractions.action({type: 'button'}, (payload: object, respond: any) => {
  console.log();
  console.log(payload);
  console.log();
});

export default slackInteractions;

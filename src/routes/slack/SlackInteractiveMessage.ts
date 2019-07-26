import { createMessageAdapter } from '@slack/interactive-messages';

import config from '../../config';
import ActionControllers from '../../controllers/slack/ActionControllers';

const slackInteractions = createMessageAdapter(config.SLACK_SIGNING_SECRET);

// Handle button clicks
slackInteractions.action({type: 'button'}, ActionControllers.addWatchAction);

export default slackInteractions;

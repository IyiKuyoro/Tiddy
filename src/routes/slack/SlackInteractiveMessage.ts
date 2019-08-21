import { createMessageAdapter } from '@slack/interactive-messages';

import config from '../../config';
import ActionControllers from '../../controllers/slack/ActionControllers';

const slackInteractions = createMessageAdapter(config.SLACK_SIGNING_SECRET);

// Handle add action button clicks
slackInteractions.action({ actionId: 'ACT001' }, ActionControllers.displayWatcherDialog);

// Handle add watcher dialog submission
slackInteractions.action({ type: 'dialog_submission', callbackId: 'CLB001' }, ActionControllers.addWatcher);

// Handle cancel button action
slackInteractions.action({ actionId: 'ACT002' }, (payload: any, respond: any) => {
  respond({
    text: 'Thanks!',
  });
});

// Handle remove watcher action
slackInteractions.action({ actionId: 'ACT003' }, ActionControllers.displayRemoveWatcherMessage);

// Remove a watcher selection action
slackInteractions.action({ actionId: 'ACT004' }, ActionControllers.removeWatcher);

// Handle back button from add watcher selection message
slackInteractions.action({ actionId: 'ACT005' }, ActionControllers.displayWelcomeMessage);

// Handle add move message action
slackInteractions.action({ actionId: /^ACT006.*/ }, ActionControllers.addMoveWatcher);

// Handle permission to post message on behave of author
slackInteractions.action({ actionId: 'ACT007' }, ActionControllers.updateDM);

export default slackInteractions;

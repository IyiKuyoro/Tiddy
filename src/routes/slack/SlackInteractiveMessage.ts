import { createMessageAdapter } from '@slack/interactive-messages';

import config from '../../config';
import ActionControllers from '../../controllers/slack/ActionControllers';
import SlashCommandsControllers from '../../controllers/slack/SlashCommands';

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

// Handle back button from add watcher selection message
slackInteractions.action({ actionId: 'ACT005' }, ActionControllers.displayWelcomeMessage);

export default slackInteractions;

import { createMessageAdapter } from '@slack/interactive-messages';
import { WebClient } from '@slack/web-api';

import config from '../../config';
import ActionControllers from '../../controllers/slack/ActionControllers';
import WorkspaceService from '../../services/WorkspaceServices';

const slackInteractions = createMessageAdapter(config.SLACK_SIGNING_SECRET);

// Handle add action button clicks
slackInteractions.action({type: 'button'}, async (payload: any, respond: any) => {
  // Array of slack handlers
  const funcs = [ActionControllers.validateUser, ActionControllers.displayAddWatcherDialog];

  // Acquire some required info
  const teamInfo = await WorkspaceService.getWorkspaceInfo(payload.team.id);
  const web = new WebClient(teamInfo.access_token);

  const data = {
    currentFunc: 0,
    funcs,
    teamInfo,
    web,
  };

  // Call the first function
  await funcs[0](data, payload, respond);
});

export default slackInteractions;

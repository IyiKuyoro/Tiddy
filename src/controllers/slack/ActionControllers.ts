import { WebClient } from '@slack/web-api';
import Dialog from 'slack-block-msg-kit/FeatureElements/Dialog';
import DialogSelectElement, { DialogSelectDataSource } from 'slack-block-msg-kit/FeatureElements/DialogSelectElement';
import DialogTextElement, { DialogTextSubTypes } from 'slack-block-msg-kit/FeatureElements/DialogTextElement';

import { Logger } from '../../helpers/logger';
import WorkspaceService from '../../services/WorkspaceServices';

export default class ActionControllers {
  public static async buttonAction(payload: any, respond: (body: object) => {}) {
    try {
      const teamInfo = await WorkspaceService.getWorkspaceInfo(payload.team.id)

      const web = new WebClient(teamInfo.access_token);

      const dialog = buildChannelWatcherDialog();

      web.dialog.open({
        dialog,
        trigger_id: payload.trigger_id,
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}

const buildChannelWatcherDialog = () => {
  // Generate channel select input
  const channelSelect = new DialogSelectElement('Select a channel:', 'watch_channel');
  channelSelect
    .changeDataSource(DialogSelectDataSource.channels)
    .addPlaceholder('Select a channel to watch');

  // Generate emoji text input
  const emojiText = new DialogTextElement('Reaction:', 'emoji_text');
  emojiText
    .assignMaxLength(50)
    .addHint('Just type the reaction text like you were searching for it without the colons. i.e smile')
    .setDefaultValue('not-this-channel');

  // Generate reaction limit input
  const reactionLimit = new DialogTextElement('Reaction Limit:', 'reaction_limit');
  reactionLimit
    .assignMaxLength(10)
    .addHint('The number of times to listen for this reaction before I take action')
    .addTextSubType(DialogTextSubTypes.number)
    .addPlaceholder('Reaction Limit');

  // Generate the dialog
  const dialog = new Dialog('Add a Channel Watcher', 'CLB001', [
    channelSelect,
    emojiText,
    reactionLimit
  ]);

  return dialog;
}

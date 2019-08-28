import axios from 'axios';
import ButtonElement, { ButtonStyle } from 'slack-block-msg-kit/BlockElements/ButtonElement';
import ChannelSelectElement from 'slack-block-msg-kit/BlockElements/ChannelSelectElement';
import StaticSelectElement from 'slack-block-msg-kit/BlockElements/StaticSelectElement';
import Actions from 'slack-block-msg-kit/Blocks/Actions';
import Section from 'slack-block-msg-kit/Blocks/Section';
import Option from 'slack-block-msg-kit/CompositionObjects/Option';
import OptionGroup from 'slack-block-msg-kit/CompositionObjects/OptionGroup';
import Text, { TextType } from 'slack-block-msg-kit/CompositionObjects/Text';
import Dialog from 'slack-block-msg-kit/FeatureElements/Dialog';
import DialogSelectElement, { DialogSelectDataSource } from 'slack-block-msg-kit/FeatureElements/DialogSelectElement';
import DialogSelectOption from 'slack-block-msg-kit/FeatureElements/DialogSelectOption';
import DialogTextElement, { DialogTextSubTypes } from 'slack-block-msg-kit/FeatureElements/DialogTextElement';
import InteractiveMessage from 'slack-block-msg-kit/InteractiveMessage';

import IWatcher from '../../../database/models/IWatcher';
import { Logger } from '../../../helpers/logger';

export const buildChannelWatcherDialog = (state: { responseUrl: string }) => {
  // Generate channel select input
  const channelSelect = new DialogSelectElement('Select a channel:', 'watch_channel');
  channelSelect.changeDataSource(DialogSelectDataSource.channels).addPlaceholder('Select a channel to watch');

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

  // Generate action input
  const action = new DialogSelectElement('Action:', 'tiddy_action');
  action
    .addOptions([new DialogSelectOption('Delete', 'delete')])
    .addOptions([new DialogSelectOption('Move', 'move')])
    .addPlaceholder('Select an action');

  // Generate the dialog
  const dialog = new Dialog('Add a Channel Watcher', 'CLB001', [channelSelect, emojiText, reactionLimit, action]);
  const stateString = JSON.stringify(state);
  dialog.addState(stateString);

  return dialog;
};

export const generateRemoveWatcherMessage = (watchers: IWatcher[]) => {
  // Generate section
  const section = new Section(
    new Text(TextType.mrkdwn, 'Okay. kindly identity the watcher you want me to remove. _They are grouped by channel_'),
    'BLK003',
  );

  // Generate static options
  const watcherOptions = new StaticSelectElement('ACT004', 'reaction-action');
  watcherOptions.addConfirmationDialogByParameters(
    'Delete Watcher',
    new Text(TextType.mrkdwn, `Are you sure?`),
    'Yes',
    'No',
  );
  // generate back button
  const backButton = new ButtonElement('<< back', 'ACT005');
  // Generate cancel button
  const cancelBtn = new ButtonElement('Cancel', 'ACT002');
  cancelBtn.changeStyle(ButtonStyle.danger);

  // Group the watchers by channel
  const watchersOptionGroups: OptionGroup[] = groupWatchers(watchers);

  // Add the watchers to the static options
  watcherOptions.addOptionGroups(watchersOptionGroups);

  // Add the static options to the action
  const actions = new Actions([backButton, watcherOptions, cancelBtn], 'BLK004');

  // Generate the interactive message
  const msg = new InteractiveMessage('Watcher removed.', true, [section, actions]);

  return msg;
};

/**
 * @description Generate the message that is used to select the channel to move messages to
 */
export const generateMoveToChannelMessage = (
  channelId: string,
  limit: number,
  reaction: string,
): InteractiveMessage => {
  const msgSection = new Section(
    new Text(
      TextType.plainText,
      `What channel would you like to move messages that have gotten ${limit} :${reaction}: reaction(s) to`,
      true,
    ),
    'BLK005',
  );

  // Build channel select drop down
  const channelList = new ChannelSelectElement(
    `ACT006/${JSON.stringify({
      channelId,
      limit,
      reaction,
    })}`,
    'Select channel to receive message',
  );

  const actions = new Actions([channelList]);

  const msg = new InteractiveMessage('Select channel to move messages to.');
  msg.addBlock(msgSection).addBlock(actions);

  return msg;
};

/**
 * @description Get the watcher info from the action id string
 */
export const getWatcherInfo = (actionId: string): { limit: number; reaction: string; channelId: string } => {
  const [_, watcherInfo] = actionId.split('/');

  return JSON.parse(watcherInfo);
};

const groupWatchers = (watchers: IWatcher[]): OptionGroup[] => {
  const groupedWatcher: { [channelId: string]: Option[] } = {};

  watchers.forEach((watcher: IWatcher) => {
    if (groupedWatcher[watcher.channel_id]) {
      groupedWatcher[watcher.channel_id].push(
        new Option(
          `:${watcher.emoji_text}: / ${watcher.tiddy_action}`,
          JSON.stringify({
            channelId: watcher.channel_id,
            emojiText: watcher.emoji_text,
            watcherId: watcher.id,
          }),
        ),
      );
    } else {
      groupedWatcher[watcher.channel_id] = [
        new Option(
          `:${watcher.emoji_text}: / ${watcher.tiddy_action}`,
          JSON.stringify({
            channelId: watcher.channel_id,
            emojiText: watcher.emoji_text,
            watcherId: watcher.id,
          }),
        ),
      ];
    }
  });

  const groupedWatchersKeys = Object.keys(groupedWatcher);
  const watchersOptionGroups: OptionGroup[] = [];
  groupedWatchersKeys.forEach((watcherId: string) => {
    const options = groupedWatcher[watcherId];
    watchersOptionGroups.push(new OptionGroup(`<#${watcherId}>`, options));
  });

  return watchersOptionGroups;
};

export function handleActionError(error: any, respond: any) {
  Logger.error(error);
  respond({
    text:
      ':interrobang: I am sorry I was unable to process that action. I have notified my maintainer, but please feel free to give it another go.',
  });
}

export async function displayAddWatcherSuccessMessage(responseUrl: string, data: any) {
  await axios.post(responseUrl, {
    replace_original: true,
    response_type: 'ephemeral',
    text: `Ok! I will begin watching <#${data.channelId || data.watch_channel}> for the :${data.reaction || data.emoji_text}: reaction.`,
  });
}

import Dialog from 'slack-block-msg-kit/FeatureElements/Dialog';
import DialogSelectElement, { DialogSelectDataSource } from 'slack-block-msg-kit/FeatureElements/DialogSelectElement';
import DialogSelectOption from 'slack-block-msg-kit/FeatureElements/DialogSelectOption';
import DialogTextElement, { DialogTextSubTypes } from 'slack-block-msg-kit/FeatureElements/DialogTextElement';

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
  action.addOptions([new DialogSelectOption('Delete', 'delete')]).addPlaceholder('Select an action');

  // Generate the dialog
  const dialog = new Dialog('Add a Channel Watcher', 'CLB001', [channelSelect, emojiText, reactionLimit, action]);
  const stateString = JSON.stringify(state);
  dialog.addState(stateString);

  return dialog;
};

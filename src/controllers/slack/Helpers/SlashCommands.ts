import ButtonElement, { ButtonStyle } from 'slack-block-msg-kit/BlockElements/ButtonElement';
import Actions from 'slack-block-msg-kit/Blocks/Actions';
import Section from 'slack-block-msg-kit/Blocks/Section';
import Text, { TextType } from 'slack-block-msg-kit/CompositionObjects/Text';
import InteractiveMessage from 'slack-block-msg-kit/InteractiveMessage';

export const buildWelcomeMessage = () => {
  const msgSection = new Section(
    new Text(
      TextType.plainText,
      `Hello there :wave: I am always happy to help!
Here are a few things I can do for you right away. :smile:`,
      true,
    ),
    'BLK001',
  );
  const cancelBtn = new ButtonElement('Cancel', 'ACT002');
  cancelBtn.changeStyle(ButtonStyle.danger);
  const addWatcher = new ButtonElement('Add Channel Watch', 'ACT001');
  const rmvWatcher = new ButtonElement('Remove Channel Watcher', 'ACT003');
  const actions = new Actions([addWatcher, rmvWatcher, cancelBtn], 'BLK002');

  const message = new InteractiveMessage('Hello there I am always happy to help!');
  message.addBlock(msgSection).addBlock(actions);

  return message;
};

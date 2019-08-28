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
  const addWatcher = new ButtonElement('Add Channel Watcher', 'ACT001');
  const rmvWatcher = new ButtonElement('Remove Channel Watcher', 'ACT003');
  const actions = new Actions([addWatcher, rmvWatcher, cancelBtn], 'BLK002');

  const message = new InteractiveMessage('Hello there I am always happy to help!');
  message.addBlock(msgSection).addBlock(actions);

  return message;
};

export function buildTokenRevokeResponse(): InteractiveMessage {
  const msgSection = new Section(
    new Text(
      TextType.plainText,
      `Got it! Be rest assured. With us, delete means delete!`,
      true,
    ),
    'BLK006',
  );

  const message = new InteractiveMessage('Your auth access has been revoked');
  message.addBlock(msgSection);

  return message;
}

export function noAuthFound(): InteractiveMessage {
  const msgSection = new Section(
    new Text(
      TextType.plainText,
      ':thinking_face: I don\'t remember you giving me the access.',
      true,
    ),
    'BLK007',
  );

  const message = new InteractiveMessage('I don\'t have access.');
  message.addBlock(msgSection);

  return message;
}

import ButtonElement from 'slack-block-msg-kit/BlockElements/ButtonElement';
import Actions from 'slack-block-msg-kit/Blocks/Actions';
import Section from 'slack-block-msg-kit/Blocks/Section';
import Text, { TextType } from 'slack-block-msg-kit/CompositionObjects/Text';
import InteractiveMessage from 'slack-block-msg-kit/InteractiveMessage';

export default class SlashCommandsControllers {
  public static defaultCommand(req: any, res: any) {
    const msgSection = new Section(
      new Text(TextType.plainText, `Hello there :wave: I am always happy to help!
Here are a few things I can do for you right away. :smile:`, true),
      '001',
    );
    const actions = new Actions([
      new ButtonElement('Add Channel Watch', 'ACT001')
    ]);

    const message = new InteractiveMessage(
      'Hello there I am always happy to help!'
    );
    message
      .addBlock(msgSection)
      .addBlock(actions);

    res.status(200).json(message);
  }
}

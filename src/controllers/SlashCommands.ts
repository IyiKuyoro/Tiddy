import Action from '../models/slack/Blocks/Action';
import Section from '../models/slack/Blocks/Section';
import ButtonElement from '../models/slack/ButtonElement';
import { TextType } from '../models/slack/CompositionObjects/Text';
import { Text } from '../models/slack/CompositionObjects/Text';
import SlackInteractiveBlockMessage from '../models/slack/SlackInteractiveBlockMessage';

export default class SlashCommandsControllers {
  public static defaultCommand(req: any, res: any) {
    const msgSection = new Section(
      new Text(TextType.plainText, `Hello there :wave: I am always happy to help!
Here are a few things I can do for you right away. :smile:`, true),
      '001',
    );
    const actions = new Action([
      new ButtonElement(new Text(TextType.plainText, 'Add Cleaner'), 'AC001')
    ], '002');

    const message = new SlackInteractiveBlockMessage(
      'Hello there I am always happy to help!',
      [msgSection, actions]
    );

    res.status(200).json(message);
  }
}

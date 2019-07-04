import Section from '../Blocks/Section';
import { Text, TextType } from '../CompositionObjects/Text';
import SlackInteractiveBlockMessage from '../SlackInteractiveBlockMessage';

describe('SlackInteractiveBlockMessage', () => {
  const message = new SlackInteractiveBlockMessage(
    'New slack message',
    [
      new Section(
        new Text(TextType.plainText, 'Hello slack, just a test section text')
      )
    ]
  );

  it('should create a new slack block message', () => {
    expect(message.text).toEqual('New slack message');
    expect(message.blocks).toEqual([
      {
        accessory: undefined,
        block_id: undefined,
        fields: undefined,
        text: {
          emoji: false,
          text: 'Hello slack, just a test section text',
          type: 'plain_text',
        },
        type: 'section',
      }
    ]);
  });

  describe('addBlock', () => {
    it('should add a new block element', () => {
      message.addBlock(
        new Section(new Text(TextType.plainText, 'yup'))
      );

      expect(message.blocks.length).toBe(2);
    });
  });
});

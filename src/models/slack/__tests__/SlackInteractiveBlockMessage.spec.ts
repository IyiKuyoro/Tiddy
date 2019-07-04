import ButtonElement from '../ButtonElement';
import { Text, TextType } from '../CompositionObjects/Text';
import Section from '../Section';
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
          emoji: undefined,
            text: 'Hello slack, just a test section text',
          type: 'plain_text',
          verbatim: undefined,
        },
        type: 'section',
      }
    ]);
  });

  describe('addBlock', () => {
    it('should add a new block element', () => {
      message.addBlock(
        new ButtonElement(
          new Text(TextType.plainText, 'Submit'),
          'actionId'
        )
      );

      expect(message.blocks.length).toBe(2);
    });
  });
});

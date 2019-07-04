import ButtonElement from '../ButtonElement';
import { Text, TextType } from '../CompositionObjects/Text';
import Section from '../Section';

describe('Section', () => {
  it('should create a new block section', () => {
    const section = new Section({
      text: 'Some text in the section',
      type: TextType.plainText,
    },
    '12ABCD',
    [{
      text: 'Some text',
      type: TextType.plainText,
    }],
    new ButtonElement(new Text(TextType.plainText, 'yes'), 'id'));

    expect(section.type).toEqual('section');
    expect(section.text).toEqual({
      text: 'Some text in the section',
      type: 'plain_text',
    });
    expect(section.block_id).toEqual('12ABCD');
    expect(section.fields).toEqual([{
      text: 'Some text',
      type: TextType.plainText,
    }]);
  });
});

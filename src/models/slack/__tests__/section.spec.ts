import Section from '../Blocks/Section';
import ButtonElement from '../ButtonElement';
import { Text, TextType } from '../CompositionObjects/Text';

describe('Section', () => {
  it('should create a new block section', () => {
    const section = new Section(new Text(TextType.plainText, 'yup'),
    '12ABCD',
    [new Text(TextType.plainText, 'Some text')],
    new ButtonElement(new Text(TextType.plainText, 'yes'), 'id'));

    expect(section.type).toEqual('section');
    expect(section.text).toEqual({
      emoji: false,
      text: 'yup',
      type: 'plain_text',
    });
    expect(section.block_id).toEqual('12ABCD');
    expect(section.fields).toEqual([{
      emoji: false,
      text: 'Some text',
      type: TextType.plainText,
    }]);
  });
});

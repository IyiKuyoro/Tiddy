import { BlockElement, BlockElementType } from '../BlockElement';
import { TextType } from '../CompositionObjects/Text';
import Section from '../SectionElement';

describe('Section', () => {
  it('should create a new block element section', () => {
    const section = new Section({
      text: 'Some text in the section',
      type: TextType.plainText,
    },
    '12ABCD',
    [{
      text: 'Some text',
      type: TextType.plainText,
    }],
    new BlockElement(BlockElementType.button));

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
    expect(section.accessory).toEqual({
      type: BlockElementType.button,
    });
  });
});

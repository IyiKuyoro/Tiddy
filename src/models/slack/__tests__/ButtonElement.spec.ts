import ButtonElement from '../ButtonElement';
import { Text, TextType } from '../CompositionObjects/Text';

describe('ButtonElement', () => {
  it('should create a new button element', () => {
    const button = new ButtonElement(
      new Text(TextType.plainText, 'Submit'),
      'BTN123');

    expect(button.type).toEqual('button');
    expect(button.text).toEqual({
      emoji: false,
      text: 'Submit',
      type: 'plain_text'
    });
    expect(button.action_id).toEqual('BTN123');
  });
})

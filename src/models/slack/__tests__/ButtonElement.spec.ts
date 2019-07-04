import ButtonElement, { ButtonStyles } from '../ButtonElement';
import { ConfirmationDialog } from '../CompositionObjects/ConfirmationDialog';
import { TextType } from '../CompositionObjects/Text';

describe('ButtonElement', () => {
  it('should create a new button element', () => {
    const button = new ButtonElement(
      {
        text: 'Submit',
        type: TextType.plainText,
      },
      'BTN123',
      ButtonStyles.primary,
      '0',
      'http://fakeurl.com',
      new ConfirmationDialog('Confirm', {
        text: 'Are you sure',
        type: TextType.plainText,
      }, 'Yes', 'No')
    );

    expect(button.type).toEqual('button');
    expect(button.text).toEqual({
      text: 'Submit',
      type: 'plain_text'
    });
    expect(button.action_id).toEqual('BTN123');
    expect(button.style).toEqual('primary');
    expect(button.value).toBe('0');
    expect(button.url).toBe('http://fakeurl.com');
  });
})

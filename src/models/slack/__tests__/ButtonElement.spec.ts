import Button, { ButtonStyles } from '../ButtonElement';
import { TextType } from '../CompositionObjects/Text';

describe('ButtonElement', () => {
  it('should create a new button element', () => {
    const button = new Button(
      {
        text: 'Submit',
        type: TextType.plainText,
      },
      'BTN123',
      ButtonStyles.primary,
      '0',
      'http://fakeurl.com',
      {
        confirm: TextType.plainText,
        deny: TextType.plainText,
        text: {
          text: 'sample text',
          type: TextType.mrkdwn,
        },
        type: TextType.plainText,
      }
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
    expect(button.confirm).toEqual({
      confirm: 'plain_text',
      deny: 'plain_text',
      text: {
        text: 'sample text',
        type: 'mrkdwn',
      },
      type: 'plain_text',
    });
  });
})

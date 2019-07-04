import { ConfirmationDialog } from '../ConfirmationDialog';
import { Text, TextType } from '../Text';

describe('ConfirmationDialog', () => {
  it('should construct a new confirmation dialog object', () => {
    const dialog = new ConfirmationDialog(
      'Confirm Action',
      new Text(TextType.mrkdwn, 'Sure?'),
      'Yes',
      'No',
    );

    expect(dialog.title.text).toBe('Confirm Action');
    expect(dialog.title.type).toBe('plain_text');
    expect(dialog.confirm.text).toBe('Yes');
    expect(dialog.confirm.type).toBe('plain_text');
    expect(dialog.text.text).toBe('Sure?');
    expect(dialog.text.type).toBe('mrkdwn');
    expect(dialog.deny.text).toBe('No');
    expect(dialog.deny.type).toBe('plain_text');
  });

  it('should throw an invalid confirmText character length error', (done) => {
    try {
      const dialog = new ConfirmationDialog(
        'Confirm Action',
        new Text(TextType.mrkdwn, 'Sure?'),
        'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
        'No',
      );
    } catch (error) {
      expect(error.message).toBe('confirmText cannot be more that 30 characters');
      done();
    }
  });

  it('should throw an invalid denyText character length error', (done) => {
    try {
      const dialog = new ConfirmationDialog(
        'Confirm Action',
        new Text(TextType.mrkdwn, 'Sure?'),
        'Yes',
        'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
      );
    } catch (error) {
      expect(error.message).toBe('denyText cannot be more that 30 characters');
      done();
    }
  });

  it('should throw an invalid textText character length error', (done) => {
    try {
      const dialog = new ConfirmationDialog(
        'Confirm Action',
        new Text(TextType.mrkdwn, `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet commodo ligula. Nam ornare, nulla ac ultricies molestie, est velit elementum nulla, quis congue erat dui vestibulum mauris. Mauris in ex dignissim, pellentesque sem vitae, sagittis libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada ornare enim non venenatis. Mauris nec sapien non augue faucibus maximus.`),
        'Yes',
        'No',
      );
    } catch (error) {
      expect(error.message).toBe('text.text cannot be more that 300 characters');
      done();
    }
  });

  it('should throw an invalid titleText character length error', (done) => {
    try {
      const dialog = new ConfirmationDialog(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        new Text(TextType.mrkdwn, 'Sure?'),
        'Yes',
        'No',
      );
    } catch (error) {
      expect(error.message).toBe('titleText cannot be more that 100 characters');
      done();
    }
  });
});

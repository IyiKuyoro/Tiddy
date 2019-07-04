import { Text, TextType } from './Text';

/** This class represents a Slack OptionObject group.
 *  For more info kindly visit https://api.slack.com/reference/messaging/composition-objects#confirm
 */
export class ConfirmationDialog{
  public title: Text;
  public text: Text;
  public confirm: Text;
  public deny: Text;

  /**
   * @description Instantiates a new Confirmation Dialog Object
   * @param  {Text} text The text object to be used in rendering the text
   * @param  {TextType.plainText} confirm The text to be rendered in the accept button
   * @param  {TextType.plainText} deny The text to be rendered in the deny button
   */
  constructor(titleText: string, text: Text, confirmText: string, denyText: string,) {
    this.validateTitleText(titleText);
    this.validateTextText(text.text);
    this.validateConfirmText(confirmText);
    this.validateDenyText(denyText);

    this.title = new Text(TextType.plainText, titleText);
    this.text = text;
    this.confirm = new Text(TextType.plainText, confirmText);
    this.deny = new Text(TextType.plainText, denyText);
  }

  /**
   * @description Ensure that the character length of deny button is not more than 30
   * @param  {string} denyText The text in the deny button
   */
  private validateDenyText(denyText: string) {
    if (denyText.length > 30) {
      throw new Error('denyText cannot be more that 30 characters');
    }
  }

  /**
   * @description Ensure that the character length of confirm button is not more than 30
   * @param  {string} confirmText The text in the confirm button
   */
  private validateConfirmText(confirmText: string) {
    if (confirmText.length > 30) {
      throw new Error('confirmText cannot be more that 30 characters');
    }
  }

  /**
   * @description Ensure that the character length of text to be rendered is not more than 300
   * @param  {string} text The text to be displayed in the dialog
   */
  private validateTextText(text: string) {
    if (text.length > 300) {
      throw new Error('text.text cannot be more that 300 characters');
    }
  }

  /**
   * @description Ensure that the character length of title is no more than 100 characters
   * @param  {string} text The text to be displayed as the dialog title
   */
  private validateTitleText(titleText: string) {
    if (titleText.length > 100) {
      throw new Error('titleText cannot be more that 100 characters');
    }
  }
}

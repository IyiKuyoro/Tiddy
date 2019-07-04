import { Text, TextType } from './Text';

/** This class represents a Slack OptionObject.
 *  For more info kindly visit https://api.slack.com/reference/messaging/composition-objects#option
 */
export class Option {
  public text: Text;
  public value: string;
  public url?: string;

  /**
   * @description Instantiates a new Option
   * @param  {string} textText A string value that is displayed in the option shown in the menu
   * @param  {string} value A string value that is passed to the app when this option is chosen
   * @param  {string} url? A URL to load in the user's browser when the option is clicked only available in Overflow menu element
   */
  constructor(
    textText: string,
    value: string,
    url?: string,
  ) {
    this.validateValue(value);
    this.validateTextText(textText);
    this.validateUrl(url);

    this.text = new Text(TextType.plainText, textText);
    this.value = value;
    this.url = url;
  }

  /**
   * @description Ensure that the character length of url is no more than 3000 characters
   * @param  {string} url The url to be be loaded when the option is selected
   */
  private validateUrl(url: string) {
    if (url && url.length > 3000) {
      throw new Error('url cannot be more that 3000 characters');
    }
  }

  /**
   * @description Ensure that the character length of url is no more than 75 characters
   * @param  {string} value The value that will be passed to the app when the option is selected
   */
  private validateValue(value: string) {
    if (value.length > 75) {
      throw new Error('value cannot be more that 75 characters');
    }
  }

  /**
   * @description Ensure that the character length of textText is no more than 75 characters
   * @param  {string} textText The text to be displayed in the option
   */
  private validateTextText(textText: string) {
    if (textText.length > 75) {
      throw new Error('textText cannot be more that 75 characters');
    }
  }
}

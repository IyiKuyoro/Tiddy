import { Option } from './Option';
import { Text, TextType } from './Text';

/** This class represents a Slack OptionObject group.
 *  For more info kindly visit https://api.slack.com/reference/messaging/composition-objects#option-group
 */
export class OptionsGroup {
  public label: Text;
  public options: Option[];

  /**
   * @description Instantiates a new Option Group object
   * @param  {string} labelText The label of the option group.
   * @param  {Option[]} options An array of option objects to be added to this group
   */
  constructor(
    labelText: string,
    options: Option[],
  ) {
    this.validateLabelText(labelText);
    this.validateOptionsSize(options);

    this.label = new Text(TextType.plainText, labelText);
    this.options = options;
  }

  /**
   * @description Add an option to the list options in this group
   * @param  {Option} option An option to be added
   */
  public addOption(option: Option) {
    if (this.options.length < 100) {
      this.options.push(option);
    } else {
      throw new Error('Options array cannot contain more than 100 options');
    }
  }

  private validateLabelText(labelText: string) {
    if (labelText.length > 75) {
      throw new Error('labelText cannot be more than 75 characters');
    }
  }

  private validateOptionsSize(options: Option[]) {
    if (options.length > 100) {
      throw new Error('options array cannot have more than 100 option items');
    }
  }
}

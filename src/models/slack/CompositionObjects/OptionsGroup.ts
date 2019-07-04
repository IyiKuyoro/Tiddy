import { Option } from './Option';
import { TextType } from './Text';

/** This class represents a Slack OptionObject group.
 *  For more info kindly visit https://api.slack.com/reference/messaging/composition-objects#option-group
 */
export class OptionsGroup {
  public label = TextType.plainText;

  /**
   * @description Instantiates a new Option Group object
   * @param  {Option[]} options An array of option objects to be added to this group
   */
  constructor(
    public options: Option[],
  ) {}

  /**
   * @description Add an option to the list options in this group
   * @param  {Option} option An option to be added
   */
  public addOption(option: Option) {
    this.options.push(option);
  }
}

import BlockElement, { BlockElementType } from './BlockElement';
import { ConfirmationDialog } from './CompositionObjects/ConfirmationDialog';
import { Text } from './CompositionObjects/Text';

export enum ButtonStyles {
  primary = 'primary',
  danger = 'danger',
}

/**
 * This class creates an instance of a button element
 * For more information on button elements in slack
 * kindly visit https://api.slack.com/reference/messaging/block-elements#button
 */
export default class ButtonElement extends BlockElement {
  public text: Text;
  public action_id: string;
  // public url?: string;
  // public value?: string;
  // public style?: ButtonStyles;
  // public confirm?: ConfirmationDialog;

  /**
   * @description Create a new block element button
   * @param  {Text} text The button text property
   * @param  {string} actionId An identifer for the action the button is performing
   * @param  {ButtonStyles=ButtonStyles.default} style The decoration type to be applied to the button
   * @param  {string} value? A value that is sent along with the interaction payload when the button is clicked
   * @param  {string} url? A URL to load in the user's browser when the button is clicked
   * @param  {ConfirmationDialog} confirm? An optional confirmation dialog after the button is clicked
   */
  constructor(text: Text, actionId: string) {
    super(BlockElementType.button);

    this.text = text;
    this.action_id = actionId;
    // this.url = url;
    // this.value = value;
    // this.style = style;
    // this.confirm = confirm;
  }
}

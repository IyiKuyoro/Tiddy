import { BlockElement, BlockElementType } from './BlockElement';
import { Text } from './CompositionObjects/Text';

/**
 * @description This class creates an instance of a section element
 * For more information on section elements in slack
 * kindly visit https://api.slack.com/reference/messaging/blocks#section
 */
export default class Section extends BlockElement {
  public text: Text;
  public block_id?: string;
  public fields?: Text[];
  public accessory?: BlockElement;

  /**
   * @description Creates a new instance of a section block element
   * @param  {Text} text The text object to be used in building the message content
   * @param  {string} block_id? The unique identifier for a block
   * @param  {Text[]} fields? Text to be rendered in a compact format that allows for 2 columns of side-by-side
   * @param  {BlockElement} accessory? A block element that is to be rendered as a child of the section
   */
  constructor(text: Text, block_id?: string, fields?: Text[], accessory?: BlockElement) {
    super(BlockElementType.section);

    this.text = text;
    this.block_id = block_id;
    this.fields = fields;
    this.accessory = accessory;
  }
}

import BlockElement from '../BlockElement';
import { Text } from '../CompositionObjects/Text';
import { Block, BlockType } from './Block';

/**
 * @description This class creates an instance of a section
 * For more information on section in slack
 * kindly visit https://api.slack.com/reference/messaging/blocks#section
 */
export default class Section extends Block {
  public text: Text;
  public fields?: Text[];
  public accessory?: BlockElement;

  /**
   * @description Creates a new instance of a section block
   * @param  {Text} text The text object to be used in building the message content
   * @param  {string} blockId? The unique identifier for this block
   * @param  {Text[]} fields? Text to be rendered in a compact format that allows for 2 columns of side-by-side
   * @param  {Block} accessory? A block element that is to be rendered as a child of the section
   */
  constructor(text: Text, blockId?: string, fields?: Text[], accessory?: BlockElement) {
    super(BlockType.section, blockId);

    this.text = text;
    this.fields = fields;
    this.accessory = accessory;
  }
}

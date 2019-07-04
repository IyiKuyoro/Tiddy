import BlockElement from '../BlockElement';
import { Block, BlockType } from './Block';

/**
 * @description This class creates an instance of an action block
 * For more information on section in slack
 * kindly visit https://api.slack.com/reference/messaging/blocks#actions
 */
export default class Action extends Block {
  public elements: BlockElement[];

  /**
   * @description Creates a new instance of the action block
   * @param  {BlockElement[]} elements An array of interactive element objects
   * @param  {string} blockId The unique identifier for this block
   */
  constructor(elements: BlockElement[], blockId?: string) {
    super(BlockType.actions, blockId);

    this.validateElementsLength(elements);
    this.elements = elements;
  }

  private validateElementsLength(elements: BlockElement[]) {
    if (elements.length > 5) {
      throw new Error('elements cannot have more that 5 items');
    }
  }
}

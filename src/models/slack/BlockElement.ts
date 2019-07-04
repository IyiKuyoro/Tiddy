export enum BlockElementType {
  section = 'section',
  divider = 'divider',
  actions = 'actions',
  button = 'button',
}

/**
 * @description This is the base class for other block elements like buttons and sections
 * If this were a language like C# it would have been an abstract class :wink:
 * kindly visit https://api.slack.com/reference/messaging/blocks#section
 */
export class BlockElement {
  public type: BlockElementType;

  /**
   * @description Constructs a new block element
   * @param  {BlockElementType} type The type of the block element
   */
  constructor(type: BlockElementType) {
    this.type = type;
  }
}

export enum BlockType {
  section = 'section',
  divider = 'divider',
  image = 'image',
  actions = 'actions',
  context = 'context',
}

/**
 * @description This is the base class for other block like sections
 * If this were a language like C# it would have been an abstract class :wink:
 * kindly visit https://api.slack.com/reference/messaging/blocks#section
 */
export class Block {
  public type: BlockType;
  public block_id: string;

  /**
   * @description Constructs a new block
   * @param  {BlockType} type The type of the block
   * @param  {string} blockId? A string acting as a unique identifier for this block
   */
  constructor(type: BlockType, blockId?: string) {
    if (blockId) {
      this.validateBlockId(blockId);
    }

    this.block_id = blockId;
    this.type = type;
  }

  private validateBlockId(blockId: string) {
    if (blockId.length > 255) {
      throw new Error('blockId cannot be more that 255 characters');
    }
  }
}

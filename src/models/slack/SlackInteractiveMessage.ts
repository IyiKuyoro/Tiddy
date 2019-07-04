import { BlockElement } from './BlockElement';

/**
 * @description This class builds an interactive message object
 * kindly visit https://api.slack.com/reference/messaging/payload
 */
export default class SlackInteractiveBlockMessage {
  public text: string;
  public blocks?: BlockElement[];
  public thread_ts?: string;
  public mrkdwn?: boolean;

  /**
   * @description Constructs a new slack interactive message
   * @param {string} text The text to be used for the message. Defaults to empty string
   * @param {BlockElement[]} blocks An array of block elements to the added to the message
   * @param {Boolean} mrkdwn  If the text should be read with markdown characters
   * @param {string} thread_ts The id of an unthreaded message to reply to
   */
  constructor(text: string = '', blocks?: BlockElement[], mrkdwn?: boolean, thread_ts?: string) {
    this.text = text;
    this.blocks = blocks;
    this.thread_ts = thread_ts;
    this.mrkdwn = mrkdwn;
  }

  /**
   * @description This method adds a new block to the block elements in this message
   * @param  {BlockElement} block a single block element to be added to the array
   * @returns Void
   */
  public addBlock(block: BlockElement): void {
    this.blocks.push(block);
  }

  /**
   * @description This method replaces the block elements in the message with the passed block elements
   * @param  {BlockElement[]} block an array of block elements to be used
   * @returns Void
   */
  public replaceBlocks(blocks: BlockElement[]): void {
    this.blocks = blocks;
  }
}

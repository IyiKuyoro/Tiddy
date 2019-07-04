import { Block } from './Blocks/Block';

/**
 * @description This class builds an interactive message object
 * kindly visit https://api.slack.com/reference/messaging/payload
 */
export default class SlackInteractiveBlockMessage {
  public text: string;
  public blocks?: Block[];
  public thread_ts?: string;
  public mrkdwn?: boolean;

  /**
   * @description Constructs a new slack interactive message
   * @param {string} text The text to be used for the message. Defaults to empty string
   * @param {Block[]} blocks An array of blocks to the added to the message
   * @param {string} thread_ts The id of an unthreaded message to reply to
   * @param {Boolean} mrkdwn  If the text should be read with markdown characters
   */
  constructor(text: string = '', blocks?: Block[], thread_ts?: string, mrkdwn: boolean = true) {
    this.text = text;
    this.blocks = blocks;
    this.thread_ts = thread_ts;
    this.mrkdwn = mrkdwn;
  }

  /**
   * @description This method adds a new block to the blocks in this message
   * @param  {Block} block a single block to be added to the array
   * @returns The object
   */
  public addBlock(block: Block): SlackInteractiveBlockMessage {
    this.blocks.push(block);
    return this;
  }
}

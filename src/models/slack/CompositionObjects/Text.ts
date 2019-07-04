export enum TextType {
  plainText = "plain_text",
  mrkdwn = "mrkdwn",
}

/** This class represents a Slack TextObject.
 *  For more info kindly visit https://api.slack.com/reference/messaging/composition-objects#text
 */
export class Text {
  /**
   * @description Instantiates a new instance of the TextObject object
   * @param  {TextType} type The type of Text object it should be
   * @param  {string} text The string to be displayed
   * @param  {boolean} emoji? If emoji's can be added or not
   * @param  {boolean} verbatim? If urls should be displayed verbatim.
   * @returns boolean
   */
  constructor(
    public type: TextType,
    public text: string,
    public emoji: boolean = false) {}
}

/*
 * This file contains interfaces for various text object types in slack
 * For more information about Text Objects, kindly visit https://api.slack.com/reference/messaging/composition-objects
 */

export enum TextObjectType {
  plain_text = 1,
  mrkdwn = 2,
}

export interface ITextObject {
  type: TextObjectType;
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
}

export interface IConfirmationDialogObject {
  type: TextObjectType.plain_text;
  text: ITextObject;
  confirm: TextObjectType.plain_text;
  deny: TextObjectType.plain_text;
}

export interface IOptionObject {
  text: TextObjectType.plain_text;
  value: string;
  url?: string;
}

export interface IOptionsGroupObject {
  label: TextObjectType.plain_text;
  options: IOptionObject[];
}

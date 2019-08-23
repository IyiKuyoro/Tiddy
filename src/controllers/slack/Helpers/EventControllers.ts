import { WebClient } from '@slack/web-api';
import ButtonElement from 'slack-block-msg-kit/BlockElements/ButtonElement';
import Actions from 'slack-block-msg-kit/Blocks/Actions';
import Block from 'slack-block-msg-kit/Blocks/Block';
import Section from 'slack-block-msg-kit/Blocks/Section';
import Text, { TextType } from 'slack-block-msg-kit/CompositionObjects/Text';

import config from '../../../config';
import IMessageInfo from '../../../database/models/IMessageInfo';
import IWatcher from '../../../database/models/IWatcher';

export function createPermissionRequest(event: any, watcher: IWatcher, messageInfo: IMessageInfo): Block[] {
  const singleUseBtn = new ButtonElement('Post on my behalf (once)', 'ACT007', JSON.stringify(messageInfo));
  singleUseBtn.addUrl(generateUserAuthButton(messageInfo));
  const multipleUseButton = new ButtonElement('Post on my behalf (always)', 'ACT008', JSON.stringify(messageInfo));
  multipleUseButton.addUrl(generateUserAuthButton({always: true, ...messageInfo}));

  return [
    new Section(
      new Text(
        TextType.mrkdwn,
        `Hi, members of your workspace are requesting that we move the message you posted in <#${
          event.item.channel
        }> to <#${
          watcher.move_channel_id
        }>. Just click the button below to grant me permission to post the message on your behave in the right channel.`,
      ),
    ),
    new Actions([
      singleUseBtn,
      multipleUseButton,
    ]),
  ];
}

export async function moveMessage(web: WebClient, messageInfo: IMessageInfo) {
  const channelHistory: any = await web.channels.history({
    channel: messageInfo.originalChannel,
    inclusive: true,
    latest: messageInfo.messageTs,
    limit: 1,
    oldest: messageInfo.messageTs,
  });

  // Post message in the appropriate channel
  await web.chat.postMessage({
    as_user: true,
    channel: messageInfo.channel,
    text: channelHistory.messages[0].text,
  });

  // Delete original message
  await web.chat.delete({
    channel: messageInfo.originalChannel,
    ts: messageInfo.messageTs,
  });
}

function generateUserAuthButton(messageInfo: IMessageInfo): string {
  const info: IMessageInfo = {
    ...messageInfo,
    user: true,
  };

  return `https://slack.com/oauth/authorize?client_id=${
    config.SLACK_CLIENT_ID
  }&scope=chat:write:user,channels:history&redirect_uri=https://af741e41.ngrok.io/auth/authorize&state=${JSON.stringify(
    info,
  )}`;
}

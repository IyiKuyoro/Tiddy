
import ButtonElement from 'slack-block-msg-kit/BlockElements/ButtonElement';
import Actions from 'slack-block-msg-kit/Blocks/Actions';
import Section from 'slack-block-msg-kit/Blocks/Section';
import Text, { TextType } from 'slack-block-msg-kit/CompositionObjects/Text';

import IWatcher from '../../../database/models/IWatcher';

export function createPermissionRequest(event: any, watcher: IWatcher, messageInfo: { channel: string; message: any; userId: any; }) {
  return [
    new Section(new Text(TextType.mrkdwn, `Hi, members of your workspace are requesting that we move the message you posted in <#${event.item.channel}> to <#${watcher.move_channel_id}>. Just click the button bellow to grant me permission to post the message on your behave in the right channel.`)),
    new Actions([
      new ButtonElement('Post on my behalf', 'ACT007', JSON.stringify(messageInfo)),
    ])
  ];
}

import { WebClient } from '@slack/web-api';

import IWatcher from '../../database/models/IWatcher';
import IWorkspace from '../../database/models/IWorkspace';
import { Logger } from '../../helpers/logger';
import MessageReactionCountService from '../../services/MessageReactionCountServices';
import WatcherServices from '../../services/WatcherServices';
import WorkspaceService from '../../services/WorkspaceServices';
import { createPermissionRequest } from './Helpers/EventControllers';

export default class EventControllers {
  public static async reactionAdded(event: any, body: any) {
    try {
      // Verify that that channel has been added for watch
      const teamInfo = await WorkspaceService.getWorkspaceInfo(body.team_id);
      const watcher = await WatcherServices.getWatcherByWorkspaceID(
        teamInfo.team_id,
        event.item.channel,
        event.reaction,
      );

      if (watcher.id !== null) {
        await MessageReactionCountService.addReactionCount(event.item.ts, watcher.id);
        const count = await MessageReactionCountService.getReactionCount(event.item.ts, watcher.id);

        // If reaction count has reached or exceeded the limit
        if (count.get_reaction_counts >= watcher.reaction_limit) {
          if (watcher.tiddy_action === 'delete') {
            const web = new WebClient(teamInfo.access_token);

            // Delete message from channel
            web.chat.delete({
              channel: event.item.channel,
              ts: event.item.ts,
            });
          } else {
            // Get message from slack
            await EventControllers.sendAuthorDM(teamInfo, event, watcher);
          }

          await MessageReactionCountService.removeMessageReactionCountRecord(event.item.ts, watcher.id);
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * @description Reduce the number of reactions
   */
  public static async reactionRemoved(event: any, body: any) {
    try {
      // Verify that that channel has been added for watch
      const watcher = await WatcherServices.getWatcherByWorkspaceID(body.team_id, event.item.channel, event.reaction);

      if (watcher.id !== null) {
        const count = await MessageReactionCountService.getReactionCount(event.item.ts, watcher.id);

        if (count.get_reaction_counts) {
          MessageReactionCountService.removeMessageReactionCountRecord(event.item.ts, watcher.id);
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * @description Send a DM to the message author requesting permission to post on their behave
   */
  private static async sendAuthorDM(teamInfo: IWorkspace, event: any, watcher: IWatcher) {
    const webBot = new WebClient(teamInfo.bot_access_token);

    // Open a conversation with the message author
    const conversation: any = await webBot.conversations.open({
      users: event.item_user,
    });

    // Collect message info
    const messageInfo = {
      channel: watcher.move_channel_id,
      messageTs: event.item.ts,
      originalChannel: event.item.channel,
      teamId: teamInfo.team_id,
    };

    // Send the message author a DM
    const c = await webBot.chat.postMessage({
      blocks: createPermissionRequest(event, watcher, messageInfo),
      channel: conversation.channel.id,
      text: 'Seems like members of your workspace want to help you direct your message to the appropriate channel.',
    });
  }
}

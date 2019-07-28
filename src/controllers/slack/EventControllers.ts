import { WebClient } from '@slack/web-api';

import { Logger } from '../../helpers/logger';
import MessageReactionCountService from '../../services/MessageReactionCountServices';
import WatcherServices from '../../services/WatcherServices';
import WorkspaceService from '../../services/WorkspaceServices';

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
          const web = new WebClient(teamInfo.access_token);

          // Delete message from channel
          web.chat.delete({
            channel: event.item.channel,
            ts: event.item.ts,
          });

          await MessageReactionCountService.removeMessageReactionCountRecord(event.item.ts, watcher.id);
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }

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
}

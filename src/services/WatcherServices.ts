import client from '../database/client';

export default class WatcherServices {
  public static async getWatcher(channelId: string, workspaceId: string, emojiText: string) {
    const query = `SELECT *
    FROM watching_channels
    WHERE
      channel_id=$1
      AND workspace_id=$2
      AND emoji_text=$3`;

    const watcher = await client.query({
      text: query,
      values: [channelId, workspaceId, emojiText],
    });

    return watcher.rows[0];
  }

  public static async addWatcher(channelId: string, emojiText: string, limit: number, action: string, teamId: string) {
    const query = 'CALL add_new_watching_channel($1, $2, $3, $4, $5)'

    const result = await client.query({
      text: query,
      values: [channelId, teamId, emojiText, limit, action]
    });

    return result;
  }
}

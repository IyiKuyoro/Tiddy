import RedisClient from '../config/RedisConfig';
import client from '../database/client';
import IWatcher from '../database/models/IWatcher';

export default class WatcherServices {
  /**
   * @description Add a new watcher to the database
   * @param  {string} channelId The channel id
   * @param  {string} emojiText The emoji text to watch for
   * @param  {number} limit The limit
   * @param  {string} action The action to be taken
   * @param  {string} teamId The team id
   * @returns Promise<void>
   */
  public static async addWatcher(
    channelId: string,
    emojiText: string,
    limit: number,
    action: string,
    teamId: string,
    moveChannelId?: string,
  ): Promise<void> {
    if (!moveChannelId) {
      const query = 'CALL add_new_watching_channel($1, $2, $3, $4, $5)';

      await client.query({
        text: query,
        values: [channelId, teamId, emojiText, limit, action],
      });
    } else {
      const query = 'CALL add_new_move_watcher($1, $2, $3, $4, $5, $6)';

      await client.query({
        text: query,
        values: [channelId, moveChannelId, teamId, emojiText, limit, action],
      });
    }

    RedisClient.DEL(`Tiddy_watcher:${channelId}-${teamId}-${emojiText}`);
  }

  /**
   * @description Get the channel watching info from the DB
   * @param  {string} workspaceId The workspace id
   * @param  {string} channelId The channel id
   * @param  {string} emojiText The reaction text
   * @returns Promise<IWatcher> The watcher info
   */
  public static async getWatcherByWorkspaceID(
    workspaceId: string,
    channelId: string,
    emojiText: string,
  ): Promise<IWatcher> {
    let result: IWatcher;
    const redisKey = `Tiddy_watcher:${channelId}-${workspaceId}-${emojiText}`;

    const redisData = await RedisClient.getAsync(redisKey);

    if (redisData) {
      result = JSON.parse(redisData);
    } else {
      const data = await client.query({
        text: 'SELECT * FROM get_watching_channels_info($1, $2, $3)',
        values: [workspaceId, channelId, emojiText],
      });

      await RedisClient.set(redisKey, JSON.stringify(data.rows[0]));

      result = data.rows[0];
    }

    return result;
  }

  /**
   * @description Get all the reaction watchers from the database
   * @param  {string} teamSerialId The workspace id
   * @param  {number} teamId The workspace record serial number
   * @returns Promise
   */
  public static async getAllWatchers(teamSerialId: number, teamId: string): Promise<IWatcher[]> {
    let results: IWatcher[];
    const redisKey = `Tiddy_watchers:${teamId}`;

    const redisData = await RedisClient.getAsync(redisKey);

    if (redisData) {
      results = JSON.parse(redisData);
    } else {
      const data = await client.query({
        text: 'SELECT * FROM watching_channels WHERE workspace_id = $1',
        values: [teamSerialId],
      });

      await RedisClient.set(redisKey, JSON.stringify(data.rows));
      await RedisClient.DEL(`Tiddy_watchers:${teamId}`);
      results = data.rows;
    }

    return results;
  }

  public static async removeAllWatchers(watcherId: number, channelId: string, emojiText: string, workspaceId: string) {
    const redisKey = `Tiddy_watcher:${channelId}-${workspaceId}-${emojiText}`;

    await RedisClient.DEL(redisKey);

    await client.query({
      text: 'CALL remove_watcher_procedure($1)',
      values: [watcherId],
    });
  }
}

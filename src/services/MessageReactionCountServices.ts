import client from '../database/client';

export default class MessageReactionCountService {
  public static async addReactionCount(messageTimeStamp: string, watcherId: number) {
    const data = await client.query({
      text: 'CALL add_message_reaction_counts($1, $2)',
      values: [messageTimeStamp, watcherId],
    });

    return data;
  }

  public static async getReactionCount(messageTimeStamp: string, watcherId: number) {
    const count = await client.query({
      text: 'SELECT * FROM get_reaction_counts($1, $2)',
      values: [messageTimeStamp, watcherId],
    });

    return count.rows[0];
  }

  public static async removeMessageReactionCountRecord(messageTimeStamp: string, watcherId: number) {
    return client.query({
      text: 'DELETE FROM message_reaction_counts WHERE watching_channels_id=$1 AND message_timestamp=$2;',
      values: [watcherId, messageTimeStamp],
    });
  }
}

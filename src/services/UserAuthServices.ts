import RedisClient from '../config/RedisConfig';
import client from '../database/client';
import IWorkspace from '../database/models/IWorkspace';
import WorkspaceService from './WorkspaceServices';

export default class UserAuthServices {
  /**
   * @description Add a new authenticated user
   * @param  {string} teamId The team id
   * @param  {string} userId The user id
   * @param  {string} userToken The user token
   * @param  {string} scope The permitted user scope
   */
  public static async addNewUser(teamId: string,userId: string, userToken: string, scope: string) {
    const text = 'CALL add_new_user($1, $2, $3, $4)';

    await client.query({
      text,
      values: [teamId, userId, userToken, scope]
    });
  }

  /**
   * @description Retrieve a user token from the database
   * @param  {number} workspaceId The serial id of the workspace in the DB
   * @param  {string} userId The user id of the owner
   * @returns string
   */
  public static async getUserToken(workspaceId: number, userId: string): Promise<string> {
    let token: string;
    const redisKey = `Tiddy_user_auth:${workspaceId}-${userId}`;

    const redisData = await RedisClient.getAsync(redisKey);
    if (redisData) {
      token = redisData;
    } else {
      const text = 'SELECT access_token FROM user_auth WHERE user_id = $1 AND workspace_id = $2';

      const res = await client.query({
        text,
        values: [userId, workspaceId],
      });

      if (res.rows[0]) {
        token = res.rows[0].access_token;
        await RedisClient.set(redisKey, res.rows[0].access_token);
      };
    }

    return token || '';
  }

  public static async deleteToken(userId: string, workspaceId: number) {
    const text = 'DELETE FROM user_auth WHERE user_id = $1 AND workspace_id = $2';

    await client.query({
      text,
      values: [userId, workspaceId],
    });

    const redisKey = `Tiddy_user_auth:${workspaceId}-${userId}`;
    RedisClient.DEL(redisKey);
  }
}

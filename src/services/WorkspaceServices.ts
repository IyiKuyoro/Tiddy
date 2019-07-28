import RedisClient from '../config/RedisConfig';
import client from '../database/client';
import IWorkspace from '../database/models/IWorkspace';

export default class WorkspaceService {
  /**
   * @description Add a new workspace
   * @param  {string} teamId The team id of the workspace
   * @param  {string} accessToken The access token of the team
   * @param  {string} teamName The team name
   * @param  {string} scope The bot permission scope
   * @param  {string} botUserId The bot user token
   * @param  {string} botAccessToken The bot access token
   * @param  {string} installerId The installer id
   */
  public static async addWorkspace(
    teamId: string,
    accessToken: string,
    teamName: string,
    scope: string,
    botUserId: string,
    botAccessToken: string,
    installerId: string,
  ) {
    const text = `INSERT INTO workspace (
        team_id, access_token, scope, team_name, bot_user_id, bot_access_token, created_at, updated_at, installer_user_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) ON CONFLICT (team_id)
      DO
        UPDATE
          SET
            access_token = $2,
            scope = $3,
            team_name = $4,
            bot_user_id = $5,
            bot_access_token = $6,
            updated_at = $8,
            installer_user_id = $9`;

    await client.query({
      text,
      values: [teamId, accessToken, scope, teamName, botUserId, botAccessToken, new Date(), new Date(), installerId],
    });

    RedisClient.DEL(`Tiddy_Workspace:${teamId}`);

    return;
  }

  /**
   * @description Get thew workspace information
   * @param  {string} teamId The team id
   * @returns Promise<IWorkspace> The workspace info
   */
  public static async getWorkspaceInfo(teamId: string): Promise<IWorkspace> {
    let result: IWorkspace;
    const redisKey = `Tiddy_Workspace:${teamId}`;

    const redisData = await RedisClient.getAsync(redisKey);
    if (redisData) {
      result = JSON.parse(redisData);
    } else {
      const data = await client.query({
        text: 'SELECT * FROM get_workspace_info($1)',
        values: [teamId],
      });

      if (data.rows[0].id === null) {
        throw new Error('This workspace does not exist.');
      }

      await RedisClient.set(redisKey, JSON.stringify(data.rows[0]));

      result = data.rows[0];
    }

    return result;
  }
}

import client from '../database/client';
import { Logger } from '../helpers/logger';

export default class WorkspaceService {
  public static async addWorkspace(
    teamId: string,
    accessToken: string,
    teamName: string,
    scope: string,
    botUserId: string,
    botAccessToken: string,
  ) {
    try {
      const text = `INSERT INTO workspace (
          team_id, access_token, scope, team_name, bot_user_id, bot_access_token, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        ) ON CONFLICT (team_id)
        DO
          UPDATE
            SET
              access_token = $2,
              scope = $3,
              team_name = $4,
              bot_user_id = $5,
              bot_access_token = $6;`;

      const newRecord = await client.query({
        text,
        values: [teamId, accessToken, scope, teamName, botUserId, botAccessToken, new Date(), new Date()],
      });

      return newRecord;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}

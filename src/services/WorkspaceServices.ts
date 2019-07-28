import client from '../database/client';

export default class WorkspaceService {
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

    const newRecord = await client.query({
      text,
      values: [teamId, accessToken, scope, teamName, botUserId, botAccessToken, new Date(), new Date(), installerId],
    });

    return newRecord;
  }

  public static async getWorkspaceInfo(teamId: string) {
    const data = await client.query({
      text: 'SELECT * FROM get_workspace_info($1)',
      values: [teamId],
    });

    if (data.rows[0].id === null) {
      throw new Error('This workspace does not exist.');
    }

    return data.rows[0];
  }
}

import { Client } from 'pg';

import config from '../config';
import { Logger } from '../logger';

const client = new Client({
  database: config.DATABASE,
  host: config.DATABASE_HOST,
  password: config.DATABASE_PASSWORD,
  port: 5432,
  user: config.DATABASE_USERNAME,
});

export default class WorkspaceService {
  public static async addWorkspace(
    teamId: string,
    accessToken: string,
    scope: string,
    teamName: string,
    botUserId: string,
    botAccessToken: string,
  ) {
    try {
      await client.connect();

      const text =
        'INSERT INTO workspace(team_id, access_token, scope, team_name, bot_user_id, bot_access_token, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';

      const newRecord = await client.query({
        text,
        values: [teamId, accessToken, scope, teamName, botUserId, botAccessToken, new Date(), new Date()],
      });

      await client.end();

      return newRecord;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}

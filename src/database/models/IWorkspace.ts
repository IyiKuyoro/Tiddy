export default interface IWorkspace {
  id: number;
  team_id: string;
  access_token: string;
  scope: string;
  team_name: string;
  bot_user_id: string;
  bot_access_token: string;
  created_at: Date;
  updated_at: Date;
  installer_user_id: string;
}

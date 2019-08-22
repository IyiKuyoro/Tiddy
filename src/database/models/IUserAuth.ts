export default interface IUserAuth {
  id: number;
  workspace_id: string;
  user_id: string;
  access_token: string;
  scope: string;
  created_at: Date;
  updated_at: Date;
}

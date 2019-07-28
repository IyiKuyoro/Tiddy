export default interface IWatcher {
  id: number;
  workspace_id: number;
  channel_id: string;
  emoji_text: string;
  reaction_limit: number;
  tiddy_action: string;
  created_at: Date;
  updated_at: Date;
}

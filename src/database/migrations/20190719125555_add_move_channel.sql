ALTER TABLE watching_channels ADD COLUMN move_channel_id VARCHAR (10);

CREATE PROCEDURE add_new_move_watcher(channel_id_param VARCHAR (10), move_channel_id_param VARCHAR (10), team_id_param VARCHAR (80), emoji_text_param VARCHAR (50), reaction_limit_param INTEGER, tiddy_action_param VARCHAR (10))
LANGUAGE plpgsql
AS $$
-- Declare variable
DECLARE
workspace_serial_id INTEGER;
BEGIN
  -- Get the workspace serial number
  SELECT
    id
  INTO
    workspace_serial_id
  FROM
    workspace
  WHERE
    team_id = team_id_param;

  -- Add the new watching channel
  INSERT INTO
    watching_channels (workspace_id, channel_id, move_channel_id, emoji_text, reaction_limit, tiddy_action, created_at, updated_at)
  VALUES
    (workspace_serial_id, channel_id_param, move_channel_id_param, emoji_text_param, reaction_limit_param, tiddy_action_param, clock_timestamp(), clock_timestamp());
END;
$$;

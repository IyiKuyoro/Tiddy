CREATE TABLE IF NOT EXISTS workspace (
  id serial UNIQUE NOT NULL,
  team_id VARCHAR (80) UNIQUE NOT NULL PRIMARY KEY,
  access_token VARCHAR (100) NOT NULL,
  scope TEXT NOT NULL,
  team_name VARCHAR (50) NOT NULL,
  bot_user_id VARCHAR (80) NOT NULL,
  bot_access_token VARCHAR (80) NOT NULL,
  installer_user_id VARCHAR (10) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS watching_channels (
  id serial UNIQUE NOT NULL,
  workspace_id INTEGER REFERENCES workspace(id) ON DELETE CASCADE,
  channel_id VARCHAR (10) NOT NULL,
  emoji_text VARCHAR (50) NOT NULL,
  reaction_limit INTEGER NOT NULL,
  tiddy_action VARCHAR (10) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (workspace_id, channel_id, emoji_text)
);

CREATE TABLE IF NOT EXISTS message_reaction_counts (
  id serial UNIQUE NOT NULL,
  watching_channels_id INTEGER REFERENCES watching_channels(id) ON DELETE CASCADE,
  message_timestamp CHAR (17) NOT NULL,
  reaction_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (watching_channels_id, message_timestamp)
);

-- Add or update a reaction count
CREATE PROCEDURE add_message_reaction_counts(message_timestamp_param CHAR (17), watching_channels_id_param INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
reaction_count_record INTEGER;
BEGIN
  -- Get the current count
  SELECT reaction_count INTO reaction_count_record
  FROM message_reaction_counts
  WHERE
    watching_channels_id=watching_channels_id_param
  AND message_timestamp=message_timestamp_param;

  -- Add or update watcher
  IF reaction_count_record > 0 THEN
    UPDATE message_reaction_counts
    SET
      reaction_count = reaction_count_record + 1,
      updated_at = clock_timestamp();
  ELSE
    INSERT INTO message_reaction_counts (
      watching_channels_id,
      message_timestamp,
      reaction_count,
      created_at,
      updated_at
    )
    VALUES (
      watching_channels_id_param,
      message_timestamp_param,
      1,
      clock_timestamp(),
      clock_timestamp()
    );
  END IF;
END;
$$;

-- Reduce or delete watcher
CREATE PROCEDURE remove_message_reaction_counts(message_timestamp_param CHAR (17), watching_channels_id_param INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
reaction_count_record INTEGER;
BEGIN
  -- Get the current count
  SELECT reaction_count INTO reaction_count_record
  FROM message_reaction_counts
  WHERE
    watching_channels_id=watching_channels_id_param
  AND message_timestamp=message_timestamp_param;

  -- Add or update watcher
  IF reaction_count_record > 1 THEN
    UPDATE message_reaction_counts
    SET
      reaction_count = reaction_count_record - 1,
      updated_at = clock_timestamp();
  ELSE
    DELETE FROM message_reaction_counts
    WHERE
    watching_channels_id=watching_channels_id_param
    AND message_timestamp=message_timestamp_param;
  END IF;
END;
$$;

CREATE PROCEDURE add_new_watching_channel(p1 VARCHAR (10), p2 VARCHAR (80), p3 VARCHAR (50), p4 INTEGER, p5 VARCHAR (10))
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
    team_id = p2;

  -- Add the new watching channel
  INSERT INTO
    watching_channels (workspace_id, channel_id, emoji_text, reaction_limit, tiddy_action, created_at, updated_at)
  VALUES
    (workspace_serial_id, p1, p3, p4, p5, clock_timestamp(), clock_timestamp());
END;
$$;

CREATE FUNCTION get_workspace_info(p1 VARCHAR (80)) RETURNS workspace AS $$
DECLARE
workspace_info workspace;
BEGIN
  -- Get the workspace info
  SELECT *
  INTO workspace_info
  FROM workspace
  WHERE p1 = workspace.team_id;

  RETURN workspace_info;
END; $$
LANGUAGE plpgsql;

-- Get reaction count
CREATE FUNCTION get_reaction_counts(message_timestamp_param CHAR (17), watching_channels_id_param INTEGER) RETURNS INTEGER AS $$
DECLARE
reaction_count_record INTEGER;
BEGIN
  -- Get the watching_channels info
  SELECT reaction_count
  INTO reaction_count_record
  FROM message_reaction_counts
  WHERE
    watching_channels_id=watching_channels_id_param
    AND message_timestamp=message_timestamp_param;

  RETURN reaction_count_record;
END; $$
LANGUAGE plpgsql;

-- Get channel watch record
CREATE FUNCTION get_watching_channels_info(workspace_id_param VARCHAR (80), channel_id_param VARCHAR (10), emoji_text_param VARCHAR (50)) RETURNS watching_channels AS $$
DECLARE
watching_channels_record watching_channels;
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
    team_id = workspace_id_param;

  -- Get the watching_channels info
  SELECT *
  INTO watching_channels_record
  FROM watching_channels
  WHERE
    workspace_id=workspace_serial_id
    AND channel_id=channel_id_param
    AND emoji_text=emoji_text_param;

  RETURN watching_channels_record;
END; $$
LANGUAGE plpgsql;

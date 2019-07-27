CREATE TABLE IF NOT EXISTS message_reaction_counts (
  id serial UNIQUE NOT NULL,
  watching_channels_id INTEGER REFERENCES watching_channels(id),
  message_timestamp CHAR (17) NOT NULL,
  reaction_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (watching_channels_id, message_timestamp)
);

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

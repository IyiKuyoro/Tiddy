CREATE TABLE IF NOT EXISTS watching_channels (
  id serial UNIQUE NOT NULL,
  workspace_id INTEGER REFERENCES workspace(id),
  channel_id VARCHAR (10) NOT NULL,
  emoji_text VARCHAR (50) NOT NULL,
  reaction_limit INTEGER NOT NULL,
  tiddy_action VARCHAR (10) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (workspace_id, channel_id, emoji_text)
);

-- Add the installer's user id column to the workspace table
ALTER TABLE workspace ADD COLUMN installer_user_id VARCHAR (10) NOT NULL;

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

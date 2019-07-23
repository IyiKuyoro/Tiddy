CREATE TABLE IF NOT EXISTS watching_channels (
  id serial UNIQUE NOT NULL,
  workspace_id INTEGER REFERENCES workspace(id),
  channel_id VARCHAR (10) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (workspace_id, channel_id)
);

CREATE PROCEDURE add_new_watching_channel(channel_id_param VARCHAR (10), team_id_param VARCHAR (80))
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
    watching_channels (workspace_id, channel_id, created_at, updated_at)
  VALUES
    (workspace_serial_id, channel_id_param, clock_timestamp(), clock_timestamp())
  ON CONFLICT (workspace_id, channel_id)
  DO
    UPDATE
      SET
        channel_id = channel_id_param,
        workspace_id = workspace_serial_id,
        updated_at = clock_timestamp();
END;
$$;

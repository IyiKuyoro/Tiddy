CREATE TABLE IF NOT EXISTS user_auth (
  id serial UNIQUE NOT NULL,
  workspace_id INTEGER REFERENCES workspace(id),
  user_id VARCHAR (10) NOT NULL,
  access_token VARCHAR (100) NOT NULL,
  scope TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (workspace_id, user_id)
);

-- Add a new user auth details
CREATE PROCEDURE add_new_user(team_id_param VARCHAR (80), user_id_param VARCHAR (10), access_token_param VARCHAR (100), scope_param TEXT)
LANGUAGE plpgsql
AS $$
DECLARE
workspace_id_param INTEGER;
BEGIN
  -- Get workspace info
  SELECT id INTO workspace_id_param
  FROM workspace
  WHERE
    team_id=team_id_param;

  -- Add a new user's auth details
  INSERT INTO user_auth (
    workspace_id,
    user_id,
    access_token,
    scope,
    created_at,
    updated_at
  )
  VALUES (
    workspace_id_param,
    user_id_param,
    access_token_param,
    scope_param,
    clock_timestamp(),
    clock_timestamp()
  );
END;
$$

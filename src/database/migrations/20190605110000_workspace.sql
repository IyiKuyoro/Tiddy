CREATE TABLE IF NOT EXISTS workspace (
  id serial UNIQUE NOT NULL,
  team_id VARCHAR (80) UNIQUE NOT NULL PRIMARY KEY,
  access_token VARCHAR (100) NOT NULL,
  scope TEXT NOT NULL,
  team_name VARCHAR (50) NOT NULL,
  bot_user_id VARCHAR (80) NOT NULL,
  bot_access_token VARCHAR (80) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

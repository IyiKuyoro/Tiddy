CREATE TABLE IF NOT EXISTS workspace (
  team_id VARCHAR (10) UNIQUE NOT NULL PRIMARY KEY,
  access_token INTEGER NOT NULL,
  scope TEXT NOT NULL,
  team_name VARCHAR (50) NOT NULL,
  bot_user_id VARCHAR (12) NOT NULL,
  bot_access_token VARCHAR (50) NOT NULL
);

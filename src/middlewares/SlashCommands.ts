import { Logger } from "../helpers/logger";

export class SlashCommands {
  public static routeSlashCommand(req: any, res: any, next: any) {
    try {

    } catch (error) {
      Logger.error(error);
      res.status(500).json()
    }
  }
}

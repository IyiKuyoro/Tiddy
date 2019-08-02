import { buildWelcomeMessage } from './Helpers/SlashCommands';

export default class SlashCommandsControllers {
  public static defaultCommand(req: any, res: any) {
    const message = buildWelcomeMessage();

    res.status(200).json(message);
  }
}

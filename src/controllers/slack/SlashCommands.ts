import { WebClient } from '@slack/web-api';

import IWorkspace from '../../database/models/IWorkspace';
import UserAuthServices from '../../services/UserAuthServices';
import WorkspaceService from '../../services/WorkspaceServices';
import { buildTokenRevokeResponse, buildWelcomeMessage, noAuthFound } from './Helpers/SlashCommands';

export default class SlashCommandsControllers {
  public static routeCommand(req: any, res: any) {
    switch (req.body.text) {
      case 'revoke':
        SlashCommandsControllers.revokeAccess(req.body, res);
        break;
      default:
        SlashCommandsControllers.defaultCommand(res);
        break;
    }
  }

  /**
   * @description Send default welcome message
   * @param  {any} res
   */
  private static defaultCommand(res:any) {
    const message = buildWelcomeMessage();

    res.status(200).json(message);
  }

  /**
   * @description Revoke user auth token
   * @param  {any} payload
   * @param  {any} res
   */
  private static async revokeAccess(payload: any, res: any) {
    try {
      const workspaceInfo: IWorkspace = await WorkspaceService.getWorkspaceInfo(payload.team_id);
      const token = await UserAuthServices.getUserToken(workspaceInfo.id, payload.user_id);

      if (token) {
        const web = new WebClient();

        await UserAuthServices.deleteToken(payload.user_id, workspaceInfo.id);

        res.status(200).json(buildTokenRevokeResponse());
      } else {
        res.status(200).json(noAuthFound());
      }
    } catch {
      res.status(200).json({});
    }
  }
}

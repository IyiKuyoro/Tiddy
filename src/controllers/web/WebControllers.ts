import { WebClient } from '@slack/web-api';

import config from '../../config';
import IMessageInfo from '../../database/models/IMessageInfo';
import { Logger } from '../../helpers/logger';
import UserAuthServices from '../../services/UserAuthServices';
import WorkspaceService from '../../services/WorkspaceServices';
import { moveMessage } from '../slack/Helpers/EventControllers';
import { acquireOAuthAccess } from './helpers/WebControllers';

class WebController {
  /**
   * @description Render the home page
   */
  public static RenderHomePage(req: any, res: any) {
    res.render('home', {
      slackButtonHref: '/install',
      title: 'Install Tiddy',
    });
  }

  /**
   * @description Redirect user to the installation page
   */
  public static InstallRedirect(req: any, res: any) {
    res.redirect(WebController.slackInstallationUrl);
  }

  /**
   * @description Render the privacy page
   */
  public static RenderPrivacyPage(req: any, res: any) {
    res.render('privacy', {
      title: 'Privacy Policy',
    });
  }

  /**
   * @description Render the support page
   */
  public static RenderSupportPage(req: any, res: any) {
    res.render('support', {
      title: 'Support',
    });
  }

  /**
   * @description Authenticate a user or install the app in a workspace
   */
  public static async Authorize(req: any, res: any) {
    try {
      const messageInfo: IMessageInfo = JSON.parse(req.query.state || '{}');

      // Check if authentication is for user or team
      if (messageInfo.user) {
        await WebController.userAuth(req, res, messageInfo);
      } else {
        await WebController.teamAuth(req, res);
      }
    } catch (error) {
      Logger.error(error);
      res.render('installationError', {
        title: 'Error',
      });
    }
  }

  // slack installation url
  private static slackInstallationUrl: string = `https://slack.com/oauth/authorize?client_id=${
    config.SLACK_CLIENT_ID
  }&scope=admin,bot,commands,channels:read,chat:write:bot,reactions:read,chat:write:user,channels:history,channels:write,groups:write,mpim:write,im:write&redirect_url=${config.SLACK_REDIRECT_URL}`;

  /**
   * @description Install the app in a team workspace
   */
  private static async teamAuth(req: any, res: any) {
    const response = await acquireOAuthAccess(req.query.code);

    await WorkspaceService.addWorkspace(
      response.data.team_id,
      response.data.access_token,
      response.data.team_name,
      response.data.scope,
      response.data.bot.bot_user_id,
      response.data.bot.bot_access_token,
      response.data.user_id,
    );
    res.render('installationSuccess', {
      title: 'Success',
    });
  }

  /**
   * @description Authenticate the app for a team
   */
  private static async userAuth(req: any, res: any, messageInfo: IMessageInfo) {
    const response = await acquireOAuthAccess(req.query.code);

    if (messageInfo.always) {
      // Add a new user to the DB
      UserAuthServices.addNewUser(
        response.data.team_id,
        response.data.user_id,
        response.data.access_token,
        response.data.scope
      );
    }

    const web = new WebClient(response.data.access_token);

    // Acquire the message content from the channel history
    await moveMessage(web, messageInfo);

    res.render('userauth', {
      title: 'Success',
    });
  }
}

export default WebController;


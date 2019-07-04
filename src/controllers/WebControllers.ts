import axios from 'axios';
import qs from 'qs';

import config from '../config';
import { Logger } from '../helpers/logger';
import WorkspaceService from '../services/WorkspaceServices';

class WebController {
  public static RenderHomePage(req: any, res: any) {
    res.render('home', {
      slackButtonHref: '/install',
      title: 'Install Tiddy',
    });
  }

  public static InstallRedirect(req: any, res: any) {
    res.redirect(WebController.slackInstallationUrl);
  }

  public static RenderPrivacyPage(req: any, res: any) {
    res.render('privacy', {
      title: 'Privacy Policy',
    });
  }

  public static RenderSupportPage(req: any, res: any) {
    res.render('support', {
      title: 'Support',
    });
  }

  public static async Authorize(req: any, res: any) {
    try {
      const response = await axios.post(
        'https://slack.com/api/oauth.access',
        qs.stringify({
          client_id: config.SLACK_CLIENT_ID,
          client_secret: config.SLACK_CLIENT_SECRET,
          code: req.query.code,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (!response.data.ok) {
        throw new Error(`Could not install app. ${response.data.error}`);
      }

      await WorkspaceService.addWorkspace(
        response.data.access_token,
        response.data.scope,
        response.data.team_name,
        response.data.team_id,
        response.data.bot.bot_user_id,
        response.data.bot.bot_access_token,
      );

      res.render('installationSuccess', {
        title: 'Success',
      });
    } catch (error) {
      Logger.error(error);
      res.render('installationError', {
        title: 'Error',
      });
    }
  }
  private static slackInstallationUrl: string = `https://slack.com/oauth/authorize?client_id=${
    config.SLACK_CLIENT_ID
  }&scope=admin,bot,commands,channels:read,chat:write:bot`;
}

export default WebController;

import axios from "axios";
import qs from 'qs';

import { Logger } from "..//logger";
import config from '../config';

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
      const response = await axios.post('https://slack.com/api/oauth.access', qs.stringify({
        client_id: config.SLACK_CLIENT_ID,
        client_secret: config.SLACK_CLIENT_SECRET,
        code: req.query.code,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (!response.data.ok) {
        throw new Error(`Could not install app. ${response.data.error}`);
      }

      res.render('installationSuccess', {
        title: 'Success',
      })
    } catch (error) {
      Logger.error(error);
      res.render('installationError', {
        title: 'Error',
      })
    }
  }

  private static slackInstallationUrl: string = `https://slack.com/oauth/authorize?client_id=${config.SLACK_CLIENT_ID}&scope=admin,bot,commands`;
}

export default WebController;

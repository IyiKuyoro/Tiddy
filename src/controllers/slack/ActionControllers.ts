import { callNextFunc } from '../../helpers';
import { Logger } from '../../helpers/logger';
import WatcherServices from '../../services/WatcherServices';
import WorkspaceService from '../../services/WorkspaceServices';
import { buildChannelWatcherDialog } from './Helpers/ActionControllers';

export default class ActionControllers {
  /**
   * @description validate that the user is the admin
   * @param  {any} data Metadata
   * @param  {any} payload The slack payload sent
   * @param  {any} respond The respond object
   */
  public static async validateUser(data: any, payload: any, respond: any) {
    try {
      // Check users permission and respond appropriately
      if (data.teamInfo.installer_user_id !== payload.user.id) {
        respond({
          text: `:cry: You are not authorized  to add a channel watcher.
  Only <@${data.teamInfo.installer_user_id}> can do so. In case <@${data.teamInfo.installer_user_id}> is no longer a member of this workspace, kindly ask the new admin to reinstall the app and add the watcher.`,
        });

        return;
      }

      await callNextFunc(data, payload, respond);
    } catch (error) {
      Logger.error(error);
      respond({
        text: ':interrobang: I am sorry I hit an error with that last request. I have logged that for my maintainers. Please feel free to try again.'
      });
    }
  }

  /**
   * @description Helps display the add watcher dialog to the user
   * @param  {any} data Metadata
   * @param  {any} payload The slack sent payload
   */
  public static displayAddWatcherDialog(data: any, payload: any, respond: any) {
    try {
      const dialog = buildChannelWatcherDialog();

      // Open the add watcher dialog on slack
      data.web.dialog.open({
        dialog,
        trigger_id: payload.trigger_id,
      });

      return;
    } catch (error) {
      Logger.error(error);
      respond({
        text: ':interrobang: I am sorry I hit an error with that last request. I have logged that for my maintainers. Please feel free to try again.'
      });
    }
  }

  /**
   * @description Ensure the watcher has not been added already
   * @param  {any} data Metadata
   * @param  {any} payload The slack payload sent
   * @param  {any} respond The respond object
   */
  public static async addWatcher(payload: any, respond: any) {
    try {
      const data = {...payload.submission};
      const teamInfo = await WorkspaceService.getWorkspaceInfo(payload.team.id);
      const watcher = await WatcherServices.getWatcher(
        data.watch_channel,
        teamInfo.id,
        data.emoji_text,
      );

      if (watcher) {
        return {
          errors: [
            {
              error: "This reaction is already being watched in the above channel",
              name: "emoji_text",
            },
            {
              error: "Already watching for the below reaction in this channel",
              name: "watch_channel",
            },
          ]
        };
      }

      await WatcherServices.addWatcher(data.watch_channel, data.emoji_text, data.reaction_limit, data.tiddy_action, payload.team.id)
    }catch (error) {
      Logger.error(error);
    }
  }
}

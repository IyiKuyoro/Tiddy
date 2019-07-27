import { callNextFunc } from '../../helpers';
import { Logger } from '../../helpers/logger';
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
}

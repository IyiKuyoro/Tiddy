import { WebClient } from '@slack/web-api';
import axios from 'axios';

import WatcherServices from '../../services/WatcherServices';
import WorkspaceService from '../../services/WorkspaceServices';
import {
  buildChannelWatcherDialog,
  displayAddWatcherSuccessMessage,
  generateMoveToChannelMessage,
  generateRemoveWatcherMessage,
  getWatcherInfo,
  handleActionError,
} from './Helpers/ActionControllers';
import { buildWelcomeMessage } from './Helpers/SlashCommands';

export default class ActionControllers {
  /**
   * @description Display added watcher
   * @param  {any} payload The slack payload sent
   * @param  {any} respond The respond object
   */
  public static async displayWatcherDialog(payload: any, respond: any) {
    try {
      const teamInfo = await WorkspaceService.getWorkspaceInfo(payload.team.id);
      const web = new WebClient(teamInfo.access_token);

      // Check users permission and respond appropriately
      if (teamInfo.installer_user_id !== payload.user.id) {
        respond({
          text: `:cry: You are not authorized  to add a channel watcher.
  Only <@${teamInfo.installer_user_id}> can do so. In case <@${
            teamInfo.installer_user_id
          }> is no longer a member of this workspace, kindly ask the new admin to reinstall the app and add the watcher.`,
        });

        return;
      }

      const dialog = buildChannelWatcherDialog({
        responseUrl: payload.response_url,
      });

      // Open the add watcher dialog on slack
      web.dialog.open({
        dialog,
        trigger_id: payload.trigger_id,
      });
    } catch (error) {
      handleActionError(error, respond);
    }
  }

  /**
   * @description Add a new watcher to the channel
   * @param  {any} payload The slack payload sent
   */
  public static async addWatcher(payload: any, respond: any) {
    try {
      const data = { ...payload.submission };
      const watcher = await WatcherServices.getWatcherByWorkspaceID(
        payload.team.id,
        data.watch_channel,
        data.emoji_text,
      );
      const state = JSON.parse(payload.state);

      if (watcher.id !== null) {
        return {
          errors: [
            {
              error: 'This reaction is already being watched in the above channel',
              name: 'emoji_text',
            },
            {
              error: 'Already watching for the below reaction in this channel',
              name: 'watch_channel',
            },
          ],
        };
      }

      if (data.reaction_limit <= 0) {
        return {
          errors: [
            {
              error: 'Cannot be less than 1',
              name: 'reaction_limit',
            },
          ],
        };
      }

      if (data.tiddy_action === 'delete') {
        // Add delete message watcher
        await ActionControllers.addDeleteWatcher(data, state, payload);
      } else {
        // Add move message watcher
        const channelMoveMsg = generateMoveToChannelMessage(data.watch_channel, data.reaction_limit, data.emoji_text);
        await axios.post(state.responseUrl, {
          delete_original: true,
        });
        respond(channelMoveMsg);
      }
    } catch (error) {
      handleActionError(error, respond);
    }
  }

  /**
   * @description Display message to remove a watcher
   * @param  {any} payload The slack payload sent
   * @param  {any} respond The respond function
   */
  public static async displayRemoveWatcherMessage(payload: any, respond: any) {
    try {
      const teamInfo = await WorkspaceService.getWorkspaceInfo(payload.team.id);

      const watchers = await WatcherServices.getAllWatchers(teamInfo.id, teamInfo.team_id);

      const message = generateRemoveWatcherMessage(watchers);

      respond(message);
    } catch (error) {
      handleActionError(error, respond);
    }
  }

  /**
   * @description Display the original welcome message
   * @param  {any} payload The slack payload sent
   * @param  {any} respond The respond function
   */
  public static displayWelcomeMessage(payload: any, respond: any) {
    try {
      const message = buildWelcomeMessage();

      respond(message);
    } catch (error) {
      handleActionError(error, respond);
    }
  }

  /**
   * @description Display the original welcome message
   * @param  {any} payload The slack payload sent
   * @param  {any} respond The respond function
   */
  public static async removeWatcher(payload: any, respond: any) {
    try {
      const selected = JSON.parse(payload.actions[0].selected_option.value);

      await WatcherServices.removeAllWatchers(
        selected.watcherId,
        selected.channelId,
        selected.emojiText,
        payload.team.id,
      );

      respond({
        text: 'Got it!',
      });
    } catch (error) {
      handleActionError(error, respond);
    }
  }

  /**
   * @description Display the original welcome message
   * @param  {any} payload The slack payload sent
   * @param  {any} respond The respond function
   */
  public static async addMoveWatcher(payload: any, respond: any) {
    try {
      const [action] = payload.actions;

      const watcherInfo = {
        moveToChannelId: action.selected_channel,
        ...getWatcherInfo(action.action_id),
      };

      await WatcherServices.addWatcher(
        watcherInfo.channelId,
        watcherInfo.reaction,
        watcherInfo.limit,
        'move',
        payload.team.id,
        watcherInfo.moveToChannelId,
      );

      await displayAddWatcherSuccessMessage(payload.response_url, watcherInfo);
    } catch (error) {
      handleActionError(error, respond);
    }
  }

  /**
   * @description Update the direct message sent to the user
   */
  public static async updateDM(payload: any, respond: any) {
    try {
      const workspaceInfo = await WorkspaceService.getWorkspaceInfo(payload.team.id);
      const web = new WebClient();

      const text = `Thanks. ${(payload.actions[0].action_id === 'ACT008' ? 'If you ever change your mind, just hit `/tiddy revoke`' : 'I will not remember that.')}`;
      await web.chat.update({
        blocks: [],
        channel: payload.container.channel_id,
        text,
        token: workspaceInfo.bot_access_token,
        ts: payload.container.message_ts,
      });
    } catch (error) {
      handleActionError(error, respond);
    }
  }

  /**
   * @description Add a new delete watcher
   */
  private static async addDeleteWatcher(data: any, state: { responseUrl: string }, payload: any) {
    await WatcherServices.addWatcher(
      data.watch_channel,
      data.emoji_text,
      data.reaction_limit,
      data.tiddy_action,
      payload.team.id,
    );

    await displayAddWatcherSuccessMessage(state.responseUrl, data);
  }
}

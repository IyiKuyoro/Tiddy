import axios from 'axios';
import qs from 'qs';

import config from '../../../config';

/**
 * @description acquire OAuth access to for the app
 * @param  {string} code
 */
export async function acquireOAuthAccess(code: string) {
  const res = await axios.post(
    'https://slack.com/api/oauth.access',
    qs.stringify({
      client_id: config.SLACK_CLIENT_ID,
      client_secret: config.SLACK_CLIENT_SECRET,
      code,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (!res.data.ok) {
    throw new Error(`Could not authorize. ${res.data.error}`);
  }

  return res;
}

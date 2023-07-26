/**
 * pusher event service
 */
// @ts-ignore
import {PUSHER_APP_KEY, PUSHER_APP_CLUSTER, PUSHER_APP_SECRET} from '@env';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {BASE_URL} from '@utils/http';
import {CONSTANTS, JSHmac} from 'react-native-hash';

class PusherEvent {
  pusher = Pusher.getInstance();

  /**
   * initialize pusher
   */

  constructor() {
    this.pusher.init({
      apiKey: PUSHER_APP_KEY,
      cluster: PUSHER_APP_CLUSTER,
      authEndpoint: `${BASE_URL}/broadcasting/auth`,
      onAuthorizer: async (channelName, socketId) => {
        const signature = `${socketId}:${channelName}`;

        const key = await JSHmac(signature, PUSHER_APP_SECRET, CONSTANTS.HmacAlgorithms.HmacSHA256);

        return {auth: `${PUSHER_APP_KEY}:${key}`};
      },
    });
  }
}

const pusherEventService = new PusherEvent();

export default pusherEventService;

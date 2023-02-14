/**
 * pusher event service
 */
// @ts-ignore
import {PUSHER_APP_KEY, PUSHER_APP_CLUSTER} from '@env';
import {Pusher} from '@pusher/pusher-websocket-react-native';

class PusherEvent {
  pusher = Pusher.getInstance();

  /**
   * initialize pusher
   */
  async connect() {
    try {
      await this.pusher.init({
        apiKey: PUSHER_APP_KEY,
        cluster: PUSHER_APP_CLUSTER,
      });
      await this.pusher.connect();
    } catch (error) {}
  }

  /**
   * subscribe to event
   */
}

const pusherEventService = new PusherEvent();

export default pusherEventService;

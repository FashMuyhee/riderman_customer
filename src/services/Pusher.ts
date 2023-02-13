/**
 * pusher event service
 */
// @ts-ignore
import {PUSHER_API_KEY, PUSHER_CLUSTER_ID} from '@env';
import {Pusher} from '@pusher/pusher-websocket-react-native';

class PusherEvent {
  pusher = Pusher.getInstance();

  /**
   * initialize pusher
   */
  async connect() {
    try {
      await this.pusher.init({
        apiKey: PUSHER_API_KEY,
        cluster: PUSHER_CLUSTER_ID,
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

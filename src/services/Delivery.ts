import {IGeneralResponse} from '@models/auth';
import {IRiderCloseByResponse, LocationValue, PickupFormBody, RiderResponse} from '@models/delivery';
import axios from 'axios';
import httpHandler from '../utils/http';
// @ts-ignore
import {G_MAP_KEY} from '@env';

type Value = {
  text: string;
  value: number;
};
type DistanceMatrix = {
  distance: Value;
  duration: Value;
  status: string;
};
class DeliveryService {
  /**
   * get online riders
   * @param  {string} lat
   * @param  {string} lng
   */
  async getOnlineRiders(lat: number, lng: number) {
    try {
      const res = await httpHandler({method: 'get', url: `/customer/get-riders`});
      // const res = await httpHandler({method: 'get', url: `/customer/get-riders?long=${lng}&lat=${lat}&radius=25`});
      const data: RiderResponse = res.data;

      return data;
    } catch (error) {
      const message: RiderResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        statusCode: 400,
        data: [],
      };
      return message;
    }
  }

  async requestPickup(body: PickupFormBody) {
    try {
      const result = await httpHandler({method: 'post', url: '/customer/pickup-requests/create', data: body});
      const data: IGeneralResponse = result.data;
      if (data.success) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      const message: IGeneralResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
      };
      return message;
    }
  }

  async getCloseByRiderByPickupLocation(pickupRequestId: string) {
    try {
      const result = await httpHandler({method: 'get', url: `/customer/pickup-requests/${pickupRequestId}/get-riders?radius=2.5`});
      const data: IRiderCloseByResponse = result.data;
      if (data.success) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      const message: IRiderCloseByResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        data: {
          pickupRequestId,
          riders: [],
        },
      };
      return message;
    }
  }

  /**
   * calculate distance between locations
   * @param  {} {x
   * @param  {{x:LocationValue;y:LocationValue}} y}
   */
  calcDistance({x, y}: {x: LocationValue; y: LocationValue}) {
    const long1 = (parseFloat(x.long) * Math.PI) / 180;
    const long2 = (parseFloat(y.long) * Math.PI) / 180;
    const lat1 = (parseFloat(x.lat) * Math.PI) / 180;
    const lat2 = (parseFloat(y.long) * Math.PI) / 180;

    // Haversine formula
    let dLong = long2 - long1;
    let dLat = lat2 - lat1;
    let a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLong / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));
    // Radius of earth in kilometers. Use 3956
    let r = 3956;
    // calculate the result
    return c * r;
  }

  /**
   * calculate distance between locations with google distance matrix
   * @param  {} {x
   * @param  {{x:LocationValue;y:LocationValue}} y}
   */
  async calcDistanceMatrix({x, y}: {x: LocationValue; y: LocationValue}) {
    const errResult: DistanceMatrix = {
      distance: {text: '0 km', value: 0},
      duration: {text: '0 mins', value: 0},
      status: 'falied',
    };
    try {
      const {data} = await axios({method: 'get', url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${y.lat},${y.long}&origins=${x.lat},${x.long}&key=${G_MAP_KEY}`});
      if (data?.status === 'OK') {
        const result: DistanceMatrix = data?.rows[0].elements[0];
        console.log("🚀 ~ file: Delivery.ts:120 ~ DeliveryService ~ calcDistanceMatrix ~ result", result)
        return result;
      }
      return errResult;
    } catch (error) {
      return errResult;
    }
  }
}

const deliveryService = new DeliveryService();
export default deliveryService;

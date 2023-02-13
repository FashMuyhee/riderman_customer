// @ts-ignore
import {G_MAP_KEY, GOOGLE_PACES_API_BASE_URL} from '@env';
import {LocationValue} from '@models/delivery';
import axios from 'axios';

class PlaceAPI {
  /**
   * get place suggestion from google map's api
   * @param  {string} searchQuery
   */
  async getPlaceSuggestions(searchQuery: string) {
    try {
      const {data} = await axios.request({
        method: 'post',
        url: `${GOOGLE_PACES_API_BASE_URL}/place/autocomplete/json?key=${G_MAP_KEY}&input=${searchQuery}&components=country:ng`,
      });
      if (data) {
        const {predictions} = data;

        return predictions;
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get location with place_id suggestion from google map's api
   * @param  {string} placeId
   */
  async getPlaceID(placeId: string) {
    try {
      const {data} = await axios.request({
        method: 'post',
        url: `${GOOGLE_PACES_API_BASE_URL}/place/details/json?key=${G_MAP_KEY}&place_id=${placeId}`,
      });
      if (data) {
        const {
          result: {
            geometry: {location},
          },
        } = data;
        return location;
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get location current location address with google geocoding api
   * @param  {LocationValue} location
   */
  async getCurrentLocationAddress(location: LocationValue) {
    try {
      const {data} = await axios.request({
        method: 'get',
        url: `${GOOGLE_PACES_API_BASE_URL}/geocode/json?key=${G_MAP_KEY}&latlng=${location.lat},${location.lat}`,
      });
      if (data) {
        console.log("🚀 ~ file: placeApi.ts:61 ~ PlaceAPI ~ getCurrentLocationAddress ~ data", data)
        // const {} = data;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
const placeAPI = new PlaceAPI();
export default placeAPI;

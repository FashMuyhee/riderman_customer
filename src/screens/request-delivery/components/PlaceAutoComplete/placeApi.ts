// @ts-ignore
import { G_MAP_KEY, GOOGLE_PACES_API_BASE_URL } from '@env';
import axios from 'axios';

class PlaceAPI {

  /**
   * get place suggestion from google map's api 
   * @param  {string} searchQuery
   */
  async getPlaceSuggestions(searchQuery: string) {
    try {
      const { data } = await axios.request({
        method: 'post',
        url: `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${G_MAP_KEY}&input=${searchQuery}`
      })
      if (data) {
        const { predictions
        } = data

        return predictions
      }
    } catch (e) {
      console.log(e)
    }
  }


  /**
   * get location with place_id suggestion from google map's api 
   * @param  {string} placeId
   */
  async getPlaceID(placeId: string) {
    console.log('pressed')
    try {
      const { data } = await axios.request({
        method: 'post',
        url: `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${G_MAP_KEY}&place_id=${placeId}`
      })
      if (data) {
        const { result: { geometry: { location } } } = data
        console.log(location)
        return location
      }
    } catch (e) {
      console.log(e)
    }
  }
}
const placeAPI = new PlaceAPI
export default placeAPI
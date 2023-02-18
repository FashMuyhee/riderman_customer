import tokenManagerService from '@services/TokenManager';
import axios, {AxiosInstance} from 'axios';
import axiosRetry from 'axios-retry';

export const BASE_URL = 'https://riderman-dev.herokuapp.com';

/**
 * axios instance
 * @param  {BASE_URL} {baseURL
 * @param  {{'content-type':'application/json'} headers
 * @param  {} }
 * @param  {} }
 */
const httpHandler: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'content-type': 'application/json',
  },
});

/**
 * Axios retry config
 */
axiosRetry(httpHandler, {
  retries: 10,
  retryDelay: retryCount => {
    return retryCount * 2000;
  },
});

/**
 * set axios token to header
 * @param token
 */
export const configureAxiosHeaders = async (token: string) => {
  httpHandler.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  httpHandler.defaults.headers.common['Content-Type'] = 'application/json';
};

httpHandler.interceptors.request.use(
  async config => {
    const token = tokenManagerService.retrieveUserSession();
    if (!config?.headers?.Authorization) {
      if (!!token?.token) {
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${token?.token}`;
      } else {
        // @ts-ignore
        config.headers['Authorization'] = '';
        //TODO: logout or something
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// httpHandler.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async function (error) {
//     let originalRequest = error.config;

//     // const serverMsg = error.response.data.message;
//     // console.log('🚀 ~ file: http.ts ~ line 74 ~ serverMsg', serverMsg);

//     // delayed token recognition from backend
//     // if (serverMsg.includes('Cannot handle token prior to')) {
//     //   return httpHandler(originalRequest);
//     // }
//     return Promise.reject(error);
//   },
// );

export default httpHandler;

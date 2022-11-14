import tokenManagerService from '@services/TokenManager';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

export const BASE_URL = 'https://riderman-dev.herokuapp.com/api/v1'

/**
 * axios instance
 * @param  {BASE_URL} {baseURL
 * @param  {{'content-type':'application/json'} headers
 * @param  {} }
 * @param  {} }
 */
const httpHandler: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

/**
 * Axios retry config
 */
axiosRetry(httpHandler, {
  retries: 10, retryDelay: retryCount => {
    return retryCount * 2000
  },
});

/**
 * set axios token to header
 * @param token 
 */
export const configureAxiosHeaders = async (token: string) => {
  httpHandler.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  httpHandler.defaults.headers.common['Content-Type'] = 'application/json';
  console.log('axois token set');
};

// // intercept request config
// httpHandler.interceptors.request.use(async (config) => {
//   const session = await isAccessTokenExpired()

//   if (!config?.headers?.Authorization) {
//     if (session === 'SESSION_ACTIVE') {
//       const userSession = tokenManagerService.retrieveUserSession();
//       // @ts-ignore
//       config.headers.common['Authorization'] = userSession !== null ? `Bearer ${userSession?.token}` : ''
//     } else if (session === 'EMPTY_SESSION') {
//       // @ts-ignore
//       config.headers.common['Authorization'] = ''
//     } else {
//       //TODO: logout or something
//     }
//   }
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });


export default httpHandler;

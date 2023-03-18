import {BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import tokenManagerService from '@services/TokenManager';
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
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

export const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data}) => {
    try {
      const result = await httpHandler({url: baseUrl + url, method, data});
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {status: err.response?.status, data: err.response?.data},
      };
    }
  };

export default httpHandler;

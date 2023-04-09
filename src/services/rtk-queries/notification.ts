import {INotificationResponse, Notification} from '@models/notification';
import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utils/http';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: axiosBaseQuery({baseUrl: '/notifications'}),
  tagTypes: ['Notifications'],
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], number>({
      query(page) {
        return {
          url: `?page=${page}`,
          method: 'GET',
        };
      },
      transformResponse: (returnValue: INotificationResponse) => {
        return !!returnValue?.data ? returnValue?.data : [];
      },
      providesTags: (result, _, req) => [
        {
          type: 'Notifications',
          id: 'Notifications',
        },
      ],
    }),
  }),
});

export const {useGetNotificationsQuery} = notificationApi;

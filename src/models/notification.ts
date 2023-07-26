import {StatusCode} from './auth';

export type Notification = {
  notificationId: string;
  title: string;
  body: string;
  readAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export interface INotificationResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: Notification[];
}

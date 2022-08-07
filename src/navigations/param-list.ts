import { IDeliveryRequestBody } from "@models/delivery";

export type AuthStackParamList = {
  login: undefined;
  f_password: undefined;
  r_password: undefined;
  verify: undefined;
  register: undefined;
};

export type GuardStackParamList = {
  home: undefined;
  request_delivery: undefined;
  delivery_summary: { item: IDeliveryRequestBody[] }
  select_rider: undefined;
  request_preview: undefined;
  payment_screen: undefined;
  package_status: undefined;
  rate_delivery: undefined;
  delivery_history: undefined;
  notifications: undefined
};
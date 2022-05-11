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
};
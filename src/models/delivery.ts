import { LocationValue } from "@screens/request-delivery/request-delivery";

export type PaymentMethod = "Cash" | 'Card' | 'Wallet'
export type DeliveryStatus = 'Processing' | 'Confirmed' | 'Completed' | 'Active'

export type IDeliveryRequestBody = {
  pickupLocation: LocationValue;
  deliveryLocation: LocationValue;
  packageName: string;
  packageTypes: string[];
  weight: string;
  packageNo: string;
  rName: string;
  rPhone: string;
  rEmail: string
}
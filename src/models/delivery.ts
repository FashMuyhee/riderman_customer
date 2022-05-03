export type IDeliveryRequestBody = {
  pickupLocation: string;
  deliveryLocation: string;
  packageName: string;
  packageTypes: string[];
  weight: string;
  packageNo: string;
  rName: string;
  rPhone: string;
  rEmail: string
}
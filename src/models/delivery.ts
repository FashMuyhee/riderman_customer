import {IUser, StatusCode} from './auth';

export type PaymentMethod = 'Cash' | 'Card' | 'Wallet';
export type DeliveryStatus = 'Processing' | 'Confirmed' | 'Completed' | 'Active';
type BikeDetails = {
  licenseNumber: string;
  bikeBrand: string;
  modelYear: string;
  bikeColor: string;
  licenseExpiry: string;
  roadWorthinessExpiry: string;
  insuranceExpiry: string;
  loadPermitExpiry: string;
  bikeModel: string;
};

export type LocationValue = {
  address: string;
  lat: string;
  long: string;
};

export type IDeliveryRequestBody = {
  pickupLocation: LocationValue;
  deliveryLocation: LocationValue;
  packageName: string;
  packageTypes: string[];
  weight: string;
  packageNo: string;
  rName: string;
  rPhone: string;
  rEmail: string;
};

export interface IRider {
  riderId: number;
  user: IUser;
  companyId: number;
  companyName: string;
  bikeDetails: BikeDetails;
  status: 'online' | 'offline';
  location: LocationValue;
  rating: string;
  completedDeliveries: string;
  createdAt: string;
}

export type DeliveryPackage = {
  packageCategories: string[];
  numberOfPackages: string;
  deliveryInstructions: string;
  weight: string;
  recipient: {
    name: string;
    phone: string;
    email: string;
  };
  distanceFromPickup: string;
};

export type PickupFormBody = {
  pickupLocation: LocationValue;
  deliveryLocations: LocationValue[];
  deliveryPackages: DeliveryPackage[];
  totalDistance: string;
};
export interface RiderResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: Array<IRider>;
}

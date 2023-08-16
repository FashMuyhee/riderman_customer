import {IUser, StatusCode} from './auth';

export type PaymentMethod = 'cash' | 'card' | 'wallet';
export type DeliveryStatus =
  | 'processing'
  | 'confirmed'
  | 'completed'
  | 'active';
export type PickupRequestProgressStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'cancelled'
  | 'picked'
  | 'too-long';

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
  instruction: string;
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

export type RiderCloseBy = {
  riderId: string;
  user: IUser;
  company: {
    companyId: number;
    name: string;
    deliveryRates: {
      perKg: number;
      perKm: number;
    };
    termsAndConditions: string;
    totalPrice: string;
  };
  bikeDetails: BikeDetails;
  status: 'active' | 'inactive';
  state: 'active' | 'offline' | 'busy';
  location: LocationValue;
  rating: string;
  completedDeliveries: number;
  createdAt: Date;
};

export type PickupRequestInfo = {
  pickupRequestId: number;
  rider: RiderCloseBy;
  pickupLocation: LocationValue;
  deliveryLocations: LocationValue[];
  deliveryPackages: DeliveryPackage[];
  paymentChannel: PaymentMethod;
  totalDistance: string;
  totalAmount: number;
  status: PickupRequestProgressStatus;
  createdAt: Date;
  updatedAt: Date;
  paid: boolean;
};

export type PickupFormBody = {
  pickupLocation: LocationValue;
  deliveryLocations: LocationValue[];
  deliveryPackages: DeliveryPackage[];
  totalDistance: string;
};

export type ConfirmPickupFormBody = {
  paymentChannel: PaymentMethod;
  totalAmount: string;
  riderId: string;
  pickupRequestId: string;
};

export interface IDeliveryItem {
  deliveryId: number;
  rider: {
    riderId: number;
    user: IUser;
    companyId: number;
    companyName: string;
    bikeDetails: BikeDetails;
    status: string;
    state: string;
    rating: string;
  };
  pickupRequest: {
    customerId: number;
    riderId: number;
    pickupLocation: LocationValue;
    deliveryLocations: Array<LocationValue>;
    deliveryPackages: Array<DeliveryPackage>;
    paymentChannel: PaymentMethod;
    totalDistance: string;
    totalAmount: string;
    pickupRequestStatus: PickupRequestProgressStatus;
    createdAt: Date;
    updatedAt: Date;
  };
  deliveryStatus: PickupRequestProgressStatus;
  processingAt: Date;
  activeAt: Date;
  completedAt: Date;
  confirmedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeliveriesResponse {
  success: boolean;
  message: string;
  data: Array<IDeliveryItem>;
  statusCode: StatusCode;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
  };
}
export interface IDeliveryResponse {
  success: boolean;
  message: string;
  data: IDeliveryItem;
  statusCode: StatusCode;
}
export interface RiderResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: Array<IRider>;
}
export interface CreatePickupRequestResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: PickupRequestInfo;
}

export interface IRiderCloseByResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: {
    pickupRequestId: string;
    riders: Array<RiderCloseBy>;
  };
}

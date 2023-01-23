export type StatusCode = 200 | 400 | 201
export interface IStoreUserSession {
  token: string,
  expireTime: number,
}

export interface IStoreUserCredentials {
  email: string;
  password: string;
  uid: number;

}

export type Channel = 'sms' | 'email'
export interface ILoginForm {
  email: string;
  password: string
}

export interface IRegisterForm {
  firstName: string,
  lastName: string,
  phone: string,
  email: string
  password: string
}

export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  verified: number,
  image: string | null,
}

export interface IVerifyTokenForm {
  phone: string;
  token: string
}

export interface IRsetPasswordForm {
  phone: string;
  token: string;
  newPassword: string
}

export interface ILoginRegisterResponse {
  success: boolean,
  message: string,
  data?: IUser,
  token?: string,
  statusCode: StatusCode
  errors?: Record<string, string[]>
}

export interface IGeneralResponse {
  message: string;
  success: boolean
  statusCode: StatusCode
}
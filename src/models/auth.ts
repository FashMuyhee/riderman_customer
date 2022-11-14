export interface IStoreUserSession {
  token: string,
  expireTime: string,
  refresh: string,
  refreshTokenExpireTime: string

}

export interface IStoreUserCredentials {
  email: string;
  password: string;
  uid: string;

}

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


export interface IVerifyTokenForm {
  phone: string;
  token: string
}

export interface IRsetPasswordForm {
  phone: string;
  token: string;
  newPassword: string
}
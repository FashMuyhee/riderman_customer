import httpHandler, { configureAxiosHeaders } from '../utils/http';
import { ILoginForm, IRegisterForm, IRsetPasswordForm, IVerifyTokenForm } from '@models/auth';
import tokenManagerService from './TokenManager';

class AuthService {
  async login({ email, password }: ILoginForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: '/login',
        data: { email, password },
      });
      const data: AuthUser = result.data;

      if (data.status) {
        const { accessToken, accessTokenExpiresIn, refreshToken, employeeID, refreshTokenExpiresIn, companyID } = data?.data || {};
        // @ts-ignore set token
        configureAxiosHeaders(accessToken);
        tokenManagerService.storeUserSession({
          token: accessToken,
          expireTime: accessTokenExpiresIn,
          refresh: refreshToken,
          refreshTokenExpireTime: refreshTokenExpiresIn,
        });

        tokenManagerService.storeUserCredentials({
          email,
          password,
          uid: employeeID,
        });
      }
      return data
    } catch (error) {
      const message: AuthUser = {
        //@ts-ignore
        message: error?.response.data.message,
        status: false,
        data: undefined
      };
      return { data: message, modules: [] };
    }
  }

  /**
  * register normal user
  * @param  {RegisterBody} body
  */
  async register(body: IRegisterForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: '/customer/register',
        data: body,
      });
      const data: RegisterUserResponse = result.data;
      if (result.status) {
        tokenManagerService.storeUserCredentials({ email: body.email, password: body.password })
      }
      return data;
    } catch (error) {
      //@ts-ignore
      // console.log(error.response);
      const message: RegisterUserResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        status: false,
        data: null,
      };
      return message;
    }
  }

  /**
   * send token for forget password
   * @param  {{email:string}} {email}
   */
  async sendForgotPasswordToken({ phone }: { phone: string }) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: '/forgot-password/send-token/sms',
        data: { phone },
      });
      const data: ForgotPassword = result.data;

      if (data.status) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      const message: ForgotPassword = {
        //@ts-ignore
        message: error?.response.data.message,
        status: false,
      };
      return message;
    }
  }

  /**
   * send token for forget password
   * @param  {{email:string}} {email}
   */
  async verifyToken(body: IVerifyTokenForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: '/forgot-password/verify-token/sms',
        data: body,
      });
      const data: ForgotPassword = result.data;

      if (data.status) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      const message: ForgotPassword = {
        //@ts-ignore
        message: error?.response.data.message,
        status: false,
      };
      return message;
    }
  }


  async resetPassword(body: IRsetPasswordForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/forgot-password/verify-token/sms'`,
        data: body,
      });
      const data: ForgotPassword = result.data;

      if (data.status) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      console.log(error.response);
      const message: ForgotPassword = {
        //@ts-ignore
        message: error?.response.data.message,
        status: false,
      };
      return message;
    }
  }

}

const authService = new AuthService();
export default authService;

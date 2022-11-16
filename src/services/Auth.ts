import httpHandler, { configureAxiosHeaders } from '../utils/http';
import { ILoginForm, IRegisterForm, ILoginRegisterResponse, IRsetPasswordForm, IVerifyTokenForm, IGeneralResponse, Channel } from '@models/auth';
import tokenManagerService from './TokenManager';

class AuthService {

  /**
   * login 
   * @param  {} {email
   * @param  {ILoginForm} password}
   */
  async login({ email, password }: ILoginForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: '/login',
        data: { email, password },
      });
      const data: ILoginRegisterResponse = result.data;
      if (data.statusCode === 200) {
        // @ts-ignore set token
        configureAxiosHeaders(data?.token);
        tokenManagerService.storeUserSession({
          token: data?.token as string,
          expireTime: 111
        });
        tokenManagerService.storeUserCredentials({
          email,
          password,
          uid: data?.data?.id as number,
        });
        return data
      }
    } catch (error) {
      const message: ILoginRegisterResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        //@ts-ignore
        statusCode: error?.response?.data?.statusCode
      };
      return message
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
      const data: ILoginRegisterResponse = result.data;
      if (data.success) {
        tokenManagerService.storeUserCredentials({ email: body.email, password: body.password, uid: data?.data?.id as number })
        // @ts-ignore set token
        configureAxiosHeaders(data?.token);
        return data;
      }
    } catch (error) {
      const message: ILoginRegisterResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        //@ts-ignore
        statusCode: error?.response?.data?.statusCode
      };
      return message;
    }
  }

  /**
   * resend account verification token
   */
  async resendAccountVerify(channel: Channel = 'email') {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/verify-user/resend-token/${channel}`,
      });
      const data: IGeneralResponse = result.data;
      if (data.success) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      const message: IGeneralResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
      };
      return message;
    }
  }

  /**
   * resend account verification token
   */
  async verifyAccount(channel: Channel = 'email', token: string) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/verify-user/${channel}`,
        data: { token }
      });
      const data: IGeneralResponse = result.data;
      if (data.success) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      const message: IGeneralResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
      };
      return message;
    }
  }

  /**
   * send token for forget password
   * @param  {{email:string}} {email}
   */
  async sendForgotPasswordToken(body: { phone: string }, channel: Channel = 'email') {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/forgot-password/send-token/${channel}`,
        data: body
      });
      const data: IGeneralResponse = result.data;

      if (data.statusCode === 200) {
        return data;
      }
    } catch (error) {
      const message: IGeneralResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        statusCode: 400
      };
      return message;
    }
  }

  /**
   * send token for forget password
   * @param  {{email:string}} {email}
   */
  async verifyForgetPasswordToken(body: IVerifyTokenForm, channel: Channel = 'email') {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/forgot-password/verify-token/${channel}`,
        data: body,
      });
      const data: IGeneralResponse = result.data;

      if (data.success) {
        return data;
      }
    } catch (error) {
      const message: IGeneralResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        statusCode: 400
      };
      return message;
    }
  }


  async resetPassword(body: IRsetPasswordForm, channel: Channel = 'email') {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/forgot-password/reset/${channel}`,
        data: body,
      });
      const data: IGeneralResponse = result.data;

      if (data.statusCode == 200) {
        return data;
      }
    } catch (error) {
      const message: IGeneralResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        statusCode: 400,
        success: false
      };
      return message;
    }
  }

}

const authService = new AuthService();
export default authService;

import httpHandler, {configureAxiosHeaders} from '../utils/http';
import {
  ILoginForm,
  IRegisterForm,
  ILoginRegisterResponse,
  IRsetPasswordForm,
  IVerifyTokenForm,
  IGeneralResponse,
  IUpdateForm,
} from '@models/auth';
import tokenManagerService from './TokenManager';

class AuthService {
  /**
   * login
   * @param  {} {email
   * @param  {ILoginForm} password}
   */
  async login({email, password}: ILoginForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: '/customer/login',
        data: {email, password},
      });
      const data: ILoginRegisterResponse = result.data;
      if (data.statusCode === 200) {
        // @ts-ignore set token
        configureAxiosHeaders(data?.token);
        tokenManagerService.storeUserSession({
          token: data?.token as string,
          expireTime: 111,
        });
        tokenManagerService.storeUserCredentials({
          email,
          password,
          uid: data?.data?.id as number,
        });
        return data;
      }
    } catch (error) {
      const message: ILoginRegisterResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        //@ts-ignore
        statusCode: error?.response?.data?.statusCode,
      };
      return message;
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
        tokenManagerService.storeUserCredentials({
          email: body.email,
          password: body.password,
          uid: data?.data?.id as number,
        });
        tokenManagerService.storeUserSession({
          token: data?.token as string,
          expireTime: 0,
        });

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
        statusCode: error?.response?.data?.statusCode,
        //@ts-ignore
        errors: error?.response.data?.errors,
      };
      return message;
    }
  }

  /**
   * resend account verification token
   */
  async resendAccountVerify() {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/verify-user/send-token`,
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
  async verifyAccount(token: string) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/verify-user`,
        data: {token},
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
  async sendForgotPasswordToken(body: {phone: string}) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/forgot-password/send-token`,
        data: body,
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
        statusCode: 400,
      };
      return message;
    }
  }

  /**
   * send token for forget password
   * @param  {{email:string}} {email}
   */
  async verifyForgetPasswordToken(body: IVerifyTokenForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/forgot-password/verify-token`,
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
        statusCode: 400,
      };
      return message;
    }
  }

  async resetPassword(body: IRsetPasswordForm) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/forgot-password/reset`,
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
        success: false,
      };
      return message;
    }
  }

  /**
   * update user profile
   * @param  {IUpdateForm} body
   */
  async updateProfile(body: IUpdateForm) {
    try {
      const result = await httpHandler({
        method: 'put',
        url: '/profile/update',
        data: body,
      });
      const data: ILoginRegisterResponse = result.data;
      if (data.statusCode === 200) {
        return data;
      }
    } catch (error) {
      const message: ILoginRegisterResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        statusCode: 400,
      };
      return message;
    }
  }
}

const authService = new AuthService();
export default authService;

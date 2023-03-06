import {IGeneralResponse} from '@models/auth';
import {IInitializeCardResponse} from '@models/payment';
import httpHandler from '@utils/http';
import {PaymentMethod} from '@models/delivery';

class PaymentService {
  /*
   *initialize card for saving
   * @param pickupRequestId string
   */
  async initializeCard() {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/transactions/initialize`,
        data: {amount: '10'},
      });
      const data: IInitializeCardResponse = result.data;
      if (data.success) {
        return data;
      }
    } catch (error) {
      //@ts-ignore
      const message: IInitializeCardResponse = {
        //@ts-ignore
        message: error?.response.data.message,
        success: false,
        data: null,
      };
      return message;
    }
  }

  /*
   * send payment method for cash
   * @param pickupRequestId string
   * @param cardId string
   * @param method PaymentMethod
   */
  async makePickupPayment(
    pickupRequestId: string,
    method: PaymentMethod,
    cardId?: string,
  ) {
    try {
      const extra = cardId ? `/${cardId}` : '';

      const result = await httpHandler({
        method: 'patch',
        url: `/customer/pickup-requests/${pickupRequestId}/pay/${method}${extra}`,
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

  /*
   * send payment method with wallet
   * @param pickupRequestId string
   */
  async makeWalletPayment(pickupRequestId: string) {
    try {
      const result = await httpHandler({
        method: 'patch',
        url: `/customer/pickup-requests/${pickupRequestId}/pay/wallet`,
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

  /*
   * send payment method with saved card
   * @param pickupRequestId string
   * @param cardId string
   */
  async makeCardPayment(pickupRequestId: string, cardId: string) {
    try {
      const result = await httpHandler({
        method: 'patch',
        url: `/customer/pickup-requests/${pickupRequestId}/pay/card/${cardId}`,
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
}

const paymentService = new PaymentService();
export default paymentService;

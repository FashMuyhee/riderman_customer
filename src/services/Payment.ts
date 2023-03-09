import {IGeneralResponse} from '@models/auth';
import {IInitializeCardResponse} from '@models/payment';
import httpHandler from '@utils/http';
import {PaymentMethod} from '@models/delivery';

class PaymentService {
  /*
   *initialize card for saving
   * @param amount string
   */
  async initializeCard(amount: string) {
    try {
      const result = await httpHandler({
        method: 'post',
        url: `/transactions/initialize`,
        data: {amount},
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

  async makePickupPayment({
    pickupRequestId,
    method,
    cardId,
  }: {
    pickupRequestId: string;
    method: PaymentMethod;
    cardId?: string;
  }) {
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
   * send payment method with new card
   * @param pickupRequestId string
   * @param reference string
   * @param save boolean
   */
  async makePaymentWithNewCard(
    pickupRequestId: string,
    reference: string,
    save: boolean,
  ) {
    try {
      const result = await httpHandler({
        method: 'patch',
        url: `/customer/pickup-requests/${pickupRequestId}/pay/card`,
        data: {reference, saveCard: save},
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

import {DeliveryHistorySheet} from '@screens/delivery-history/sheets';
import CompanyInfoSheet from '@screens/request-delivery/sheets/company-Info';
import {AddBankAccountSheet, WithdrawSheet} from '@screens/wallet/sheets';
import {registerSheet} from 'react-native-actions-sheet';

registerSheet('delivery-history', DeliveryHistorySheet);
registerSheet('add-bank-account', AddBankAccountSheet);
registerSheet('withdraw-wallet', WithdrawSheet);
registerSheet('company-info', CompanyInfoSheet);

export {};

import { formatWithMask, Masks } from "react-native-mask-input";


type Cards = 'VISA' | 'MASTERCARD' | 'AMEX' | 'DINERS' | 'DISCOVER' | 'JCB'

interface ICard {
  cardType: Cards;
  formattedValue: string
}
/**
 * Detect card type from input number
 * @param cc 
 * @returns Card
 */
const detectCard = (cc: string): ICard | undefined => {
  let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  let mastercard = new RegExp('^5[1-5][0-9]{14}$');
  let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

  const { obfuscated } = formatWithMask({
    text: cc,
    mask: Masks.CREDIT_CARD,
    obfuscationCharacter: '*',
  });

  if (visa.test(cc)) {
    return {
      cardType: 'VISA',
      formattedValue: obfuscated
    }
  }

  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return {
      cardType: 'MASTERCARD',
      formattedValue: obfuscated
    }
  }

  return undefined;

};
export default detectCard

export const maskCreditCard = (creditCard: string) => {
  if (creditCard.length < 6) return creditCard;
  const last4Characters = creditCard.substr(-4);
  const maskingCharacters = creditCard.substr(0, creditCard.length - 5).replace(/\d/g, '#');
  return `${maskingCharacters}${last4Characters}`;
}

type Card = 'visa' | 'mastercard' | 'amex' | 'diners' | 'discover' | 'jcb'

/**
 * Detect card type from input number
 * @param number 
 * @returns Card
 */
const detectCard = (number: string): Card => {
  const cards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  };

  if (cards.visa.test(number)) {
    return 'visa'
  }
  if (cards.mastercard.test(number)) {
    return 'mastercard'
  }
  if (cards.amex.test(number)) {
    return 'amex'
  }
  if (cards.diners.test(number)) {
    return 'diners'
  }
  if (cards.discover.test(number)) {
    return 'discover'
  }

  return 'jcb'

};
export default detectCard
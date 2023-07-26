import React from 'react';
import MasterCardLogo from './icons/mastercard-logo';
import VisaCardLogo from './icons/visacard-logo';

export type CardType = 'visa' | 'mastercard';

const CreditCardLogo = ({cardType}: {cardType: CardType}) => {
  if (cardType === 'mastercard') {
    return <MasterCardLogo />;
  }
  if (cardType === 'visa') {
    return <VisaCardLogo />;
  }

  return null;
};

export default CreditCardLogo;

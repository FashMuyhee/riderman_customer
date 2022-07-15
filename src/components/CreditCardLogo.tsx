import React from 'react';
import detectCard from '@utils/detect-card';
import MasterCardLogo from './icons/mastercard-logo';
import VisaCardLogo from './icons/visacard-logo';

const CreditCardLogo = ({creditCardNumber}: {creditCardNumber: string}) => {
  const cardType = detectCard(creditCardNumber);

  if (cardType === 'MASTERCARD') {
    return <MasterCardLogo />;
  }
  if (cardType === 'VISA') {
    return <VisaCardLogo />;
  }

  return null;
};

export default CreditCardLogo;

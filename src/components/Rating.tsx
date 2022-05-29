import {hp} from '@utils/responsive';
import {Text, HStack, IFlexProps} from 'native-base';
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import React from 'react';
import StarIcon from './icons/star';

interface RatingProp extends IHStackProps {
  number: number;
  props?: IFlexProps;
}

const Rating = ({number, ...rest}: RatingProp) => {
  return (
    <HStack {...rest} space="1" alignItems="center" justifyContent="space-between">
      <StarIcon />
      <Text fontSize={hp(1.4)}>{number}</Text>
    </HStack>
  );
};

export default Rating;

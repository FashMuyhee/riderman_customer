import {View} from 'native-base';
import React from 'react';

type Props = {};

const DashedDivider = (props: Props) => {
  return <View borderWidth={1} mx="10px" mt="10px" borderColor="gray.200" borderStyle="dashed" />;
};

export default DashedDivider;

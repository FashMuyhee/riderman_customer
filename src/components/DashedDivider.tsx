import {View} from 'native-base';
import React from 'react';

const DashedDivider = ({mt = '10px'}: {mt?: string}) => {
  return <View borderWidth={1} mx="10px" mt={mt} borderColor="gray.200" borderStyle="dashed" />;
};

export default DashedDivider;

import {Pressable, Text} from 'native-base';
import React from 'react';

type Props = {
  onPress: () => void;
};

const AddCardBtn = (props: Props) => {
  return (
    <Pressable onPress={props.onPress} justifyContent="space-between" flexDirection="row" h="20px" w="95px" alignItems="center">
      <Text fontWeight="600" fontSize="11px" color="main">
        +
      </Text>
      <Text underline fontWeight="600" fontSize="11px" color="main">
        Add New Card
      </Text>
    </Pressable>
  );
};

export default AddCardBtn;

import React from 'react';
import {
  HStack,
  ChevronLeftIcon,
  IconButton,
  Image,
  View,
  Center,
} from 'native-base';
import logo from '@images/logo.png';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '@navigations/param-list';

const Navbar = () => {
  const {goBack} =
    useNavigation<NavigationProp<AuthStackParamList, 'f_password'>>();
  return (
    <HStack
      bg="main"
      w="full"
      h="65px"
      px="20px"
      justifyContent="space-between"
      alignItems="center">
      <View w="1/3">
        <IconButton
          onPress={goBack}
          size={10}
          bg="#2c925c"
          rounded="full"
          icon={<ChevronLeftIcon size={4} color="white" />}
        />
      </View>
      <Center w="1/3">
        <Image source={logo} alt="logo" />
      </Center>
      <View w="1/3" />
    </HStack>
  );
};

export default Navbar;

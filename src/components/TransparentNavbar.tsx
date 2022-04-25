import React from 'react';
import {View, HStack, IconButton, ChevronLeftIcon, Image} from 'native-base';
import BarIcon from './icons/bar';
import bellIcon from '@images/icons/bell.png';
export type ITransparentNavbarProps = {
  isHome?: boolean;
};

const TransparentNavbar: React.FC<ITransparentNavbarProps> = ({
  isHome = false,
}) => {
  return (
    <HStack
      zIndex={1}
      position="absolute"
      bg="transparent"
      alignItems="center"
      justifyContent="space-between"
      px="8"
      w="full"
      mt="20%"
      h="60px">
      <IconButton
        size={10}
        shadow="2"
        bg="white"
        rounded="full"
        icon={
          isHome ? (
            <BarIcon />
          ) : (
            <View ml="-5px">
              <ChevronLeftIcon color="black" size={4} />
            </View>
          )
        }
      />
      {isHome && (
        <IconButton
          size={10}
          shadow="2"
          bg="white"
          rounded="full"
          icon={
            <Image
              source={bellIcon}
              alt="bell_icon"
              h="23px"
              w="23px"
              resizeMode="center"
            />
          }
        />
      )}
    </HStack>
  );
};

export default TransparentNavbar;

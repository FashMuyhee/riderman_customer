import React from 'react';
import {View, HStack, IconButton, ChevronLeftIcon, Pressable, Image, Badge} from 'native-base';
import BarIcon from './icons/bar';
import bellIcon from '@images/icons/bell.png';
import {useNavigation, DrawerActions} from '@react-navigation/native';

export type ITransparentNavbarProps = {
  isHome?: boolean;
  notificationCount?: number;
};

const TransparentNavbar: React.FC<ITransparentNavbarProps> = ({isHome = false, notificationCount = 0}) => {
  const {dispatch, goBack} = useNavigation();
  return (
    <HStack zIndex={1} position="absolute" bg="transparent" alignItems="center" justifyContent="space-between" px="8" w="full" mt="20%" h="60px">
      <IconButton
        onPress={() => (isHome ? dispatch(DrawerActions.toggleDrawer()) : goBack())}
        size={10}
        shadow="2"
        bg="white"
        _pressed={{background: 'white'}}
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
        <Pressable alignItems="center" justifyContent="center" size={10} shadow="2" bg="white" rounded="full">
          <Image source={bellIcon} alt="bell_icon" h="23px" w="23px" resizeMode="center" />
          <Badge
            position="absolute"
            top="1px"
            right="5px"
            bg="main"
            rounded="md"
            px="5px"
            py="1px"
            alignItems="center"
            justifyContent="center"
            _text={{
              fontSize: 9,
              color: 'white',
              textAlign: 'center',
            }}>
            {notificationCount}
          </Badge>
        </Pressable>
      )}
    </HStack>
  );
};

export default TransparentNavbar;

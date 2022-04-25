import React from 'react';
import {Text, View} from 'native-base';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenWrapper, TransparentNavbar, TextInput, Button} from '@components';
import {hp} from '@utils/responsive';
import MapSection from './components/MapSection';

export type IHomeProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'home'>;
};

const Home: React.FC<IHomeProps> = ({navigation}) => {
  return (
    <ScreenWrapper translucentBar barStyle="dark-content">
      <TransparentNavbar isHome />
      <MapSection />
      <View
        bg="bg"
        borderTopRadius="3xl"
        w="full"
        h={hp(30)}
        position="absolute"
        px="32px"
        py="25px"
        bottom="0">
        <Text fontWeight="semibold" fontSize="20px">
          Hi , James 👋
        </Text>
        <Text fontSize="12px" color="grey.200" mt="8px">
          What would you like to get delivered?
        </Text>
        <TextInput mt="15px" placeholder="Request Pickup" disabled />
        <Button title="Delivery History" mt="10px" />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

import React from 'react';
import {Text, View} from 'native-base';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenWrapper, TransparentNavbar, Button, PressableInput} from '@components';
import {hp} from '@utils/responsive';
import MapSection from './components/MapSection';
import {AuthContext} from '@contexts/AuthContext';

export type IHomeProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'home'>;
};

const Home: React.FC<IHomeProps> = ({navigation}) => {
  const {user} = React.useContext(AuthContext);
  return (
    <ScreenWrapper translucentBar barStyle="dark-content">
      <TransparentNavbar isHome />
      <MapSection />
      <View bg="bg" borderTopRadius="3xl" w="full" h={hp(30)} position="absolute" px="32px" py="25px" bottom="0">
        <Text fontWeight="semibold" fontSize="20px">
          Hi , {user?.firstName} 👋
        </Text>
        <Text fontSize="12px" color="grey.200" mt="8px">
          What would you like to get delivered?
        </Text>
        <PressableInput onPress={() => navigation.navigate('request_delivery')} mt="15px" placeholder="Request Pickup" value="" />
        <Button title="Delivery History" mt="10px" onPress={() => navigation.navigate('delivery_history')} />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

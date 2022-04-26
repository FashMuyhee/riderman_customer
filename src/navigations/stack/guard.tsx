import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '@screens/home/home';
import {RequestDelivery} from '@screens/request-delivery/request-delivery';
import {useTheme} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {GuardStackParamList} from '../param-list';
const StackNav = createStackNavigator<GuardStackParamList>();

const GuardStack = () => {
  const {colors} = useTheme();
  return (
    <StackNav.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: true,
        presentation: 'card',
        cardStyleInterpolator: Platform.select({
          android: CardStyleInterpolators.forFadeFromBottomAndroid,
          ios: CardStyleInterpolators.forHorizontalIOS,
        }),
        headerStyle: {
          backgroundColor: colors.main,
          elevation: 0,
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'font-medium',
          fontSize: 16,
        },
      }}>
      <StackNav.Screen
        component={Home}
        options={{headerShown: false}}
        name="home"
      />
      <StackNav.Screen
        component={RequestDelivery}
        options={{
          headerTitle: 'Delivery Form',
        }}
        name="request_delivery"
      />
    </StackNav.Navigator>
  );
};

export default GuardStack;

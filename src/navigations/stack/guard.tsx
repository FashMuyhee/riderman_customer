import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Home from '@screens/home/home';
import {RequestDelivery} from '@screens/request-delivery/request-delivery';
import RequestPreview from '@screens/request-delivery/request-preview';
import SelectRider from '@screens/request-delivery/select-rider';
import DeliverySummary from '@screens/request-delivery/summary';
import {useTheme} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {GuardStackParamList} from '../param-list';

const StackNav = createStackNavigator<GuardStackParamList>();

const GuardStack = () => {
  const {colors} = useTheme();
  return (
    <StackNav.Navigator
      initialRouteName="request_delivery"
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
          fontFamily: 'Poppins-Medium',
          fontSize: 16,
        },
        headerBackTitle: 'Back',
        headerBackTitleStyle: {
          fontSize: 14,
        },
      }}>
      <StackNav.Screen component={Home} options={{headerShown: false}} name="home" />
      <StackNav.Screen
        component={RequestDelivery}
        options={{
          headerTitle: 'Delivery Form',
        }}
        name="request_delivery"
      />
      <StackNav.Screen
        component={DeliverySummary}
        options={{
          headerTitle: 'Delivery Summary',
        }}
        name="delivery_summary"
      />
      <StackNav.Screen
        component={SelectRider}
        options={{
          headerShown: false,
        }}
        name="select_rider"
      />
      <StackNav.Screen
        component={RequestPreview}
        options={{
          headerShown: false,
        }}
        name="request_preview"
      />
    </StackNav.Navigator>
  );
};

export default GuardStack;

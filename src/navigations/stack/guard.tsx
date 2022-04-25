import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '@screens/home/home';
import React from 'react';
import {Platform} from 'react-native';
import {GuardStackParamList} from '../param-list';

const StackNav = createStackNavigator<GuardStackParamList>();

const GuardStack = () => {
  return (
    <StackNav.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        cardStyleInterpolator: Platform.select({
          android: CardStyleInterpolators.forFadeFromBottomAndroid,
          ios: CardStyleInterpolators.forHorizontalIOS,
        }),
      }}>
      <StackNav.Screen component={Home} name="home" />
    </StackNav.Navigator>
  );
};

export default GuardStack;

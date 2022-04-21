import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ForgetPassword from '@screens/auth/forget-password';
import Login from '@screens/auth/login';
import Register from '@screens/auth/register';
import ResetPassword from '@screens/auth/reset-password';
import React from 'react';
import {Platform} from 'react-native';
import {AuthStackParamList} from '../param-list';

const StackNav = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <StackNav.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        cardStyleInterpolator: Platform.select({
          android: CardStyleInterpolators.forFadeFromBottomAndroid,
          ios: CardStyleInterpolators.forHorizontalIOS,
        }),
      }}>
      <StackNav.Screen component={Login} name="login" />
      <StackNav.Screen component={ForgetPassword} name="f_password" />
      <StackNav.Screen component={ResetPassword} name="r_password" />
      <StackNav.Screen component={Register} name="register" />
    </StackNav.Navigator>
  );
};

export default AuthStack;

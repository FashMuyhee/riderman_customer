import {createStackNavigator} from '@react-navigation/stack';
import Login from '@screens/auth/login';
import React from 'react';
import {AuthStackParamList} from '../param-list';

const StackNav = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <StackNav.Navigator
      initialRouteName="login"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen component={Login} name="login" />
    </StackNav.Navigator>
  );
};

export default AuthStack;

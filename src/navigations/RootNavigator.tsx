import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStack from './stack/auth';
import GuardStack from './stack/guard';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <GuardStack />
    </NavigationContainer>
  );
};

export default RootNavigator;

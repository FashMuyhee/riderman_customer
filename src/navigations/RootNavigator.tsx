import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStack from './stack/auth';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default RootNavigator;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DrawerNavigator from './drawer/drawer';
import AuthStack from './stack/auth';
import GuardStack from './stack/guard';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;

import {AuthContext} from '@contexts/AuthContext';
import {NavigationContainer, createNavigationContainerRef} from '@react-navigation/native';
import React, {useContext} from 'react';
import DrawerNavigator from './drawer/drawer';
import AuthStack from './stack/auth';

export const navigationRef = createNavigationContainerRef();

const RootNavigator = () => {
  const {isAuth} = useContext(AuthContext);

  const Navigator = () => {
    if (isAuth) return <DrawerNavigator />;

    return <AuthStack />;
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator />
    </NavigationContainer>
  );
};

export default RootNavigator;

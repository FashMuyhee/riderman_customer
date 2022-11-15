import {AuthContext} from '@contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import DrawerNavigator from './drawer/drawer';
import AuthStack from './stack/auth';

const RootNavigator = () => {
  const {isAuth} = useContext(AuthContext);

  const Navigator = () => {
    if (isAuth) return <DrawerNavigator />;

    return <AuthStack />;
  };

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default RootNavigator;

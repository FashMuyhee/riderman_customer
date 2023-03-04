import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/configs/theme';
import RootNavigator from './src/navigations/RootNavigator';
import {RequestContextProvider} from '@contexts/RequestContext';
import {AuthContextProvider} from '@contexts/AuthContext';
import {ApiProvider} from '@reduxjs/toolkit/dist/query/react';
import {deliveryApi} from '@services/rtk-queries/deliveries';

const App = () => {
  return (
    <ApiProvider api={deliveryApi}>
      <NativeBaseProvider theme={theme}>
        <AuthContextProvider>
          <RequestContextProvider>
            <RootNavigator />
          </RequestContextProvider>
        </AuthContextProvider>
      </NativeBaseProvider>
    </ApiProvider>
  );
};

export default App;

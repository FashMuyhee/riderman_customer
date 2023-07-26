import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/configs/theme';
import RootNavigator from './src/navigations/RootNavigator';
import {RequestContextProvider} from '@contexts/RequestContext';
import {AuthContextProvider} from '@contexts/AuthContext';
import {Provider} from 'react-redux';
import {store} from '@store/index';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <AuthContextProvider>
          <RequestContextProvider>
            <RootNavigator />
          </RequestContextProvider>
        </AuthContextProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

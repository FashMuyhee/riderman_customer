import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/configs/theme';
import RootNavigator from './src/navigations/RootNavigator';
import {RequestContextProvider} from '@contexts/RequestContext';
import {AuthContextProvider} from '@contexts/AuthContext';
import {Provider} from 'react-redux';
import {store} from '@store/index';
//@ts-ignore
import {ONE_SIGNAL_ID} from '@env';
import {OneSignal, LogLevel} from 'react-native-onesignal';

const App = () => {
  OneSignal.initialize(ONE_SIGNAL_ID);
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

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

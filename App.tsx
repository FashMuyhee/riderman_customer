import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/configs/theme';
import RootNavigator from './src/navigations/RootNavigator';
import {RequestContextProvider} from '@contexts/RequestContext';
import {AuthContextProvider} from '@contexts/AuthContext';
import pusherEventService from '@services/Pusher';

const App = () => {
  
  useEffect(() => {
    pusherEventService.connect();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <RequestContextProvider>
          <RootNavigator />
        </RequestContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};
export default App;

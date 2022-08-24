import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/configs/theme';
import RootNavigator from './src/navigations/RootNavigator';
import {RequestContextProvider} from '@contexts/RequestContext';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <RequestContextProvider>
        <RootNavigator />
      </RequestContextProvider>
    </NativeBaseProvider>
  );
};
export default App;

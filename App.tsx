import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/configs/theme';
import RootNavigator from './src/navigations/RootNavigator';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <RootNavigator />
    </NativeBaseProvider>
  );
};
export default App;

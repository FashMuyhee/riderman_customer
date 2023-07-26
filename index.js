/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './App';
import { name as appName } from './app.json';
import { enableLatestRenderer } from 'react-native-maps';
enableLatestRenderer();
enableScreens()
LogBox.ignoreLogs(['Failed prop type: Invalid prop `selectionColor` supplied to `Text`:',
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types",
  "Failed prop type: Invalid prop `backgroundColor` supplied to `Image`:"])
AppRegistry.registerComponent(appName, () => App);

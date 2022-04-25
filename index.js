/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './App';
import { name as appName } from './app.json';
import { enableLatestRenderer } from 'react-native-maps';
enableLatestRenderer();
enableScreens()
AppRegistry.registerComponent(appName, () => App);

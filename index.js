/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import {AppWrapper} from './AppWrapper';
import AppFake from './AppFake';

function HeadlessCheck({isHeadless}) {
  if (Platform.OS === 'ios') {
    if (isHeadless) {
      console.log('headless');
      return <AppFake />;
    } else {
      return <AppWrapper />;
    }
  }
  return <AppWrapper />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

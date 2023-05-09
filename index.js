/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import {AppWrapper} from './AppWrapper';
import AppFake from './AppFake';
import messaging from '@react-native-firebase/messaging';
import {setNotificationHasNew} from './src/services/domain/NotificationHasNew';

if (Platform.OS === 'ios') {
  messaging().setBackgroundMessageHandler(async messaging => {
    await setNotificationHasNew(true);
  });
}

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

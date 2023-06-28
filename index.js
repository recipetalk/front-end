/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {setNotificationHasNew} from './src/services/repository/NotificationHasNew';
import HeadlessCheck from './HeadlessCheck';

if (Platform.OS === 'ios') {
  messaging().setBackgroundMessageHandler(async messaging => {
    await setNotificationHasNew(true);
  });
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

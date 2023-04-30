import React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './src/store/config';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';

export const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ToastProvider
        swipeEnabled={false}
        offset={100}
        duration={4000}
        textStyle={{
          fontFamily: 'Pretendard Variable',
          fontStyle: 'normal',
          fontWeight: '500',
        }}>

          <App />
      </ToastProvider>
    </Provider>
  );
};

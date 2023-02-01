/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Login from './src/pages/Login';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <Login />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;

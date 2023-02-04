/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/pages/HomeScreen';
import IngredientsScreen from './src/pages/IngredientsScreen';
import LoginScreen from './src/pages/LoginScreen';
import MypageScreen from './src/pages/MypageScreen';
import ReceiptScreen from './src/pages/ReceiptScreen';
import RecipeScreen from './src/pages/RecipeScreen';
import SignUpScreen from './src/pages/SignUpScreen';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Ingredients" component={IngredientsScreen} />
        <Stack.Screen name="Mypage" component={MypageScreen} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

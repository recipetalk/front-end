/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './src/pages/LoginScreen';
import {store} from './src/store/config';
import {Provider} from 'react-redux';
import SignupIdScreen from './src/pages/signup/SignupIdScreen';
import SignupNicknameScreen from './src/pages/signup/SignupNicknameScreen';
import SignupPasswordScreen from './src/pages/signup/SignupPasswordScreen';
import SignupPhoneVerificationScreen from './src/pages/signup/SignupPhoneVerificationScreen';
import BottomTab from './src/components/atoms/BottomTab';
import SimpleLoginScreen from './src/pages/SimpleLoginScreen';
import PrepEditScreen from './src/pages/Ingredients/PrepEditScreen';
import RecipeEditFirstScreen from './src/pages/recipe/RecipeEditFirstScreen';
import RecipeEditSecondScreen from './src/pages/recipe/RecipeEditSecondScreen';
import RecipeEditThirdScreen from './src/pages/recipe/RecipeEditThirdScreen';
import CommentHistoryScreen from './src/pages/myPage/CommentHistoryScreen';
import RecipeDetailStackNavigator from './src/navigations/RecipeDetailStackNavigator';

if (__DEV__) {
  import('./config').then(() => {
    console.log('Reactotron Configured');
  });
}

function RecipeEditStackNavigator() {
  const RecipeEditStack = createNativeStackNavigator();
  return (
    <RecipeEditStack.Navigator>
      <RecipeEditStack.Screen
        name="RecipeEditFirstScreen"
        component={RecipeEditFirstScreen}
        options={{headerShown: false}}
      />
      <RecipeEditStack.Screen
        name="RecipeEditSecondScreen"
        component={RecipeEditSecondScreen}
        options={{headerShown: false}}
      />
      <RecipeEditStack.Screen
        name="RecipeEditThirdScreen"
        component={RecipeEditThirdScreen}
        options={{headerShown: false}}
      />
    </RecipeEditStack.Navigator>
  );
}

function SignStackNavigator() {
  const SignStack = createNativeStackNavigator();
  return (
    <SignStack.Navigator>
      <SignStack.Screen
        name="SignupIdScreen"
        component={SignupIdScreen}
        options={{headerShown: false}}
      />
      <SignStack.Screen
        name="SignupNickname"
        component={SignupNicknameScreen}
        options={{headerShown: false}}
      />
      <SignStack.Screen
        name="SignupPassword"
        component={SignupPasswordScreen}
        options={{headerShown: false}}
      />
      <SignStack.Screen
        name="SignupPhoneVerification"
        component={SignupPhoneVerificationScreen}
        options={{headerShown: false}}
      />
    </SignStack.Navigator>
  );
}

function LoginStackNavigator() {
  const LoginStack = createNativeStackNavigator();
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginHome"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="Signup"
        component={SignStackNavigator}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="SimpleLogin"
        component={SimpleLoginScreen}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  );
}

function App() {
  const Stack = createNativeStackNavigator();

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Login">
  //       <Stack.Screen
  //         name="Login"
  //         component={LoginScreen}
  //         options={{headerShown: false}}
  //       />
  //       <Stack.Screen
  //         name="Home"
  //         component={HomeScreen}
  //         options={{headerShown: false}}
  //       />
  //       <Stack.Screen
  //         name="SignUp"
  //         component={SignUpScreen}
  //         options={{headerShown: false}}
  //       />
  //       <Stack.Screen name="Ingredients" component={IngredientsScreen} />
  //       <Stack.Screen name="Mypage" component={MypageScreen} />
  //       <Stack.Screen name="Receipt" component={ReceiptScreen} />
  //       <Stack.Screen name="Recipe" component={RecipeScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginStackNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={BottomTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PrepEdit"
            component={PrepEditScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

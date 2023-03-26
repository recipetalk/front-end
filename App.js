/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import LoginScreen from './src/pages/LoginScreen';
import {store} from './src/store/config';
import {Provider, useDispatch, useSelector} from 'react-redux';
import SignupIdScreen from './src/pages/signup/SignupIdScreen';
import SignupNicknameScreen from './src/pages/signup/SignupNicknameScreen';
import SignupPasswordScreen from './src/pages/signup/SignupPasswordScreen';
import SignupFirstEmailVerificationScreen from './src/pages/signup/SignupFirstEmailVerificationScreen';
import BottomTab from './src/components/atoms/BottomTab';
import SimpleLoginScreen from './src/pages/SimpleLoginScreen';
import PrepEditScreen from './src/pages/Ingredients/PrepEditScreen';
import RecipeEditFirstScreen from './src/pages/recipe/RecipeEditFirstScreen';
import RecipeEditSecondScreen from './src/pages/recipe/RecipeEditSecondScreen';
import RecipeEditThirdScreen from './src/pages/recipe/RecipeEditThirdScreen';
import CommentHistoryScreen from './src/pages/myPage/CommentHistoryScreen';
import RecipeDetailStackNavigator from './src/navigations/RecipeDetailStackNavigator';
import SignupSecondEmailVerificationScreen from './src/pages/signup/SignupSecondEmailVerificationScreen';
import SignupFinishScreen from './src/pages/signup/SignupFinishScreen';
import ProfileScreen from './src/pages/myPage/ProfileScreen';
import SequenceDetailDescriptionScreen from './src/pages/SequenceDetailDescriptionScreen';
import SetTimerPage from './src/pages/timer/SetTimerPage';
import SignupStartScreen from './src/pages/signup/SignupStartScreen';
import messaging from '@react-native-firebase/messaging';
import {loadLoginFromStorage} from './src/services/domain/AutoLogin';
import {jsonAPI} from './src/services/connect/API';
import {
  saveJwtAccessTokenToStorage,
  saveJwtRefreshToStorage,
} from './src/services/domain/JwtToken';

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
        name="SignupFirstScreen"
        component={SignupStartScreen}
        options={{headerShown: false}}
      />
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
        name="SignupEmailFirst"
        component={SignupFirstEmailVerificationScreen}
        options={{headerShown: false}}
      />
      <SignStack.Screen
        name="SignupEmailSecond"
        component={SignupSecondEmailVerificationScreen}
        options={{headerShown: false}}
      />
      <SignStack.Screen
        name="SignupFinish"
        component={SignupFinishScreen}
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
  const [savedLoginData, setSavedLoginData] = useState({
    username: '',
    password: '',
    isAutoLogin: false,
  });

  const [renderingFinish, setRenderingFinish] = useState(false);

  useEffect(() => {
    async function init() {
      const loadLoginData = await loadLoginFromStorage();

      setSavedLoginData({
        username: loadLoginData.username,
        password: loadLoginData.password,
        isAutoLogin: loadLoginData.isAutoLogin,
      });

      if (loadLoginData.isAutoLogin === true) {
        console.log('자동로그인');
        jsonAPI
          .post('/auth/login', {
            username: loadLoginData.username,
            password: loadLoginData.password,
          })
          .then(async res => {
            console.log('자동로그인');
            await saveJwtRefreshToStorage(res.headers['refresh-token']);
            await saveJwtAccessTokenToStorage(res.headers.authorization);
          })
          .catch(err => {
            setSavedLoginData({...savedLoginData, isAutoLogin: false});
          });
      }
    }
    init().then(() => setRenderingFinish(true));
    fcmSet();
  }, []);

  const fcmSet = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log('fcmToken : ' + fcmToken);
    } else {
      console.log('disable');
      await messaging().requestPermission();
    }
  };

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
        {renderingFinish ? (
          <Stack.Navigator>
            {savedLoginData.isAutoLogin ? null : (
              <Stack.Screen
                name="Login"
                component={LoginStackNavigator}
                options={{headerShown: false}}
              />
            )}
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
            <Stack.Screen
              name="RecipeEdit"
              component={RecipeEditStackNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CommentHistory"
              component={CommentHistoryScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RecipeDetailScreen"
              component={RecipeDetailStackNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SequenceDetailScreen"
              component={SequenceDetailDescriptionScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SetTimerPage"
              component={SetTimerPage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : undefined}
      </NavigationContainer>
    </Provider>
  );
}

export default App;

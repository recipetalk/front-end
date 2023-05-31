/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createRef, useEffect, useRef} from 'react';
import LoginScreen from './src/pages/LoginScreen';
import SignupIdScreen from './src/pages/signup/SignupIdScreen';
import SignupNicknameScreen from './src/pages/signup/SignupNicknameScreen';
import SignupPasswordScreen from './src/pages/signup/SignupPasswordScreen';
import SignupFirstEmailVerificationScreen from './src/pages/signup/SignupFirstEmailVerificationScreen';
import BottomTab from './src/components/atoms/BottomTab';
import SimpleLoginScreen from './src/pages/SimpleLoginScreen';
import PrepRegisterScreen from './src/pages/Ingredients/PrepRegisterScreen';
import RecipeEditFirstScreen from './src/pages/recipe/RecipeEditFirstScreen';
import RecipeEditSecondScreen from './src/pages/recipe/RecipeEditSecondScreen';
import RecipeEditThirdScreen from './src/pages/recipe/RecipeEditThirdScreen';
import CommentHistoryScreen from './src/pages/myPage/CommentHistoryScreen';
import SignupSecondEmailVerificationScreen from './src/pages/signup/SignupSecondEmailVerificationScreen';
import SignupFinishScreen from './src/pages/signup/SignupFinishScreen';
import ProfileScreen from './src/pages/myPage/ProfileScreen';
import SequenceDetailDescriptionScreen from './src/pages/SequenceDetailDescriptionScreen';
import SetTimerPage from './src/pages/timer/SetTimerPage';
import SignupStartScreen from './src/pages/signup/SignupStartScreen';
import messaging from '@react-native-firebase/messaging';
import {MyRecipeScreen} from './src/pages/myPage/MyRecipeScreen';
import {MyPrepScreen} from './src/pages/myPage/MyPrepScreen';
import {MyBookmarkScreen} from './src/pages/myPage/MyBookmarkScreen';
import {MyLikeScreen} from './src/pages/myPage/MyLikeScreen';
import {EditProfileScreen} from './src/pages/myPage/EditProfileScreen';
import {FollowerScreen} from './src/pages/myPage/FollowerScreen';
import {FollowingScreen} from './src/pages/myPage/FollowingScreen';
import {BlockUserScreen} from './src/pages/myPage/BlockUserScreen';
import FindIdScreen from './src/pages/login/find/FindIdScreen';
import ReturnIdScreen from './src/pages/login/find/ReturnIdScreen';
import PrepDetailScreen from './src/pages/Ingredients/PrepDetailScreen';
import EfficacyScreen from './src/pages/Ingredients/EfficacyScreen';
import EfficacyEditScreen from './src/pages/Ingredients/EfficacyEditScreen';
import {ReplyCommentScreen} from './src/pages/ReplyCommentScreen';
import {NotificationScreen} from './src/pages/NotificationScreen';
import {NavigationContainer} from '@react-navigation/native';
import notifee, {EventType} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {exist, notExist} from './src/store/notification/NotificationStateSlice';
import {
  isNotificationHasNew,
  setNotificationHasNew,
} from './src/services/repository/NotificationHasNew';
import FindPasswordScreen from './src/pages/login/find/FindPasswordScreen';
import PasswordEmailVerificationScreen from './src/pages/login/find/PasswordEmailVerificationScreen';
import PasswordModifyScreen from './src/pages/login/find/PasswordModifyScreen';
import EndPasswordScreen from './src/pages/login/find/EndPasswordScreen';
import RegisterMyIngredientsScreen from './src/pages/Ingredients/RegisterMyIngredientsScreen';
import IngredientsEditScreen from './src/pages/Ingredients/IngredientsEditScreen';
import RecipeDetailDescriptionScreen from './src/pages/recipe/RecipeDetailDescriptionScreen';
import SearchScreen from './src/pages/search/SearchScreen';
import {SearchResultScreen} from './src/pages/search/SearchResultScreen';

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
      <LoginStack.Screen
        name="FindId"
        component={FindIdScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="ReturnId"
        component={ReturnIdScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="FindPassword"
        component={FindPasswordScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="VerificationPasswordEmail"
        component={PasswordEmailVerificationScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="PasswordModify"
        component={PasswordModifyScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="EndPassword"
        component={EndPasswordScreen}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  );
}

function App() {
  const Stack = createNativeStackNavigator();
  const navigation = createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fcmSet();
  }, []);

  const fcmSet = async () => {
    const enabled = await messaging().requestPermission({
      sound: true,
      badge: true,
      alert: true,
    });
    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log('fcmToken : ' + fcmToken);
    } else {
      console.log('disable');
      await messaging().requestPermission();
    }
  };

  const setBackgroundNotiOption = async () => {
    const hasNew = await isNotificationHasNew();
    if (hasNew) {
      dispatch(exist());
    }
  };

  const onDisplayNotification = async ({title = '', body = ''}) => {
    const channelId = await notifee.createChannel({
      id: 'recipeTalk',
      name: '포그라운드알림',
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
    });
  };
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      const title = remoteMessage?.notification?.title;
      const body = remoteMessage?.notification?.body;
      if (remoteMessage?.notification !== undefined) {
        dispatch(exist());

        await onDisplayNotification({title, body});
      }
    });

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        dispatch(exist());
      });

    messaging().onNotificationOpenedApp(async () => {
      await navigation.current.navigate('Notification');
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage?.notification !== undefined) {
        dispatch(exist());
      }
    });

    return notifee.onForegroundEvent(({type, detail}) => {
      //타이머 알림 제외. 함부로 수정하면 안됨. 수정할땐 김현진이 호출할 것.
      if (detail.notification.body === '타이머가 다됬어요!') {
        return;
      }
      if (type === EventType.PRESS) {
        navigation.current.navigate('Notification');
        dispatch(notExist());
        setNotificationHasNew(false);
      }
    });
  }, []);

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
    <NavigationContainer ref={navigation}>
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
          name="PrepRegister"
          component={PrepRegisterScreen}
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
          component={RecipeDetailDescriptionScreen}
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
        <Stack.Screen
          name="MyRecipe"
          component={MyRecipeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyPrep"
          component={MyPrepScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyBookmark"
          component={MyBookmarkScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyLike"
          component={MyLikeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Follower"
          component={FollowerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Following"
          component={FollowingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlockUser"
          component={BlockUserScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReplyComment"
          component={ReplyCommentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrepDetail"
          component={PrepDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Efficacy"
          component={EfficacyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EfficacyEdit"
          component={EfficacyEditScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterMyIngredients"
          component={RegisterMyIngredientsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IngredientsEdit"
          component={IngredientsEditScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Search'}
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'SearchResult'}
          component={SearchResultScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

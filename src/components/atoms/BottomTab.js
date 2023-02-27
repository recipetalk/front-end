import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../pages/HomeScreen';
import IngredientsScreen from '../../pages/IngredientsScreen';
import MypageScreen from '../../pages/MypageScreen';
import ReceiptScreen from '../../pages/ReceiptScreen';
import RecipeScreen from '../../pages/RecipeScreen';
import LoginScreen from '../../pages/LoginScreen';
import SignUpScreen from '../../pages/SignUpScreen';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          headerShown: false,
        }}
        screenOptions={{
          tabBarActiveTintColor: '#fb8c00',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          title: '레시피',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Receipt"
        component={ReceiptScreen}
        options={{
          title: '영수증',
        }}
      />
      <Tab.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          title: '식재료',
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MypageScreen}
        options={{
          title: 'My',
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

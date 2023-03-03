import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../pages/HomeScreen';
import IngredientsScreen from '../../pages/IngredientsScreen';
import MypageScreen from '../../pages/MypageScreen';
import ReceiptScreen from '../../pages/ReceiptScreen';
import RecipeScreen from '../../pages/RecipeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeDetailDescriptionScreen from '../../pages/RecipeDetailDescriptionScreen';
import Header from '../organisms/Header';

const RecipeStackNavigator = () => {
  const RecipeStack = createNativeStackNavigator();
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeHome"
        component={RecipeScreen}
        options={{headerShown: false}}
      />
      <RecipeStack.Screen
        name="RecipeDetail"
        component={RecipeDetailDescriptionScreen}
        options={{headerShown: false}}
      />
    </RecipeStack.Navigator>
  );
};

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
        component={RecipeStackNavigator}
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
          headerShown: false,
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
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

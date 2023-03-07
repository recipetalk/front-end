import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../pages/HomeScreen';
import MypageScreen from '../../pages/MypageScreen';
import ReceiptScreen from '../../pages/ReceiptScreen';
import RecipeScreen from '../../pages/RecipeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeDetailDescriptionScreen from '../../pages/RecipeDetailDescriptionScreen';
import SequenceDetailDescriptionScreen from '../../pages/SequenceDetailDescriptionScreen';
import IngredientsAddScreen from '../../pages/Ingredients/IngredientsAddScreen';

const RecipeDetailStackNavigator = () => {
  const RecipeDetailStack = createNativeStackNavigator();
  return (
    <RecipeDetailStack.Navigator>
      <RecipeDetailStack.Screen
        name="RecipeDetailDescription"
        component={RecipeDetailDescriptionScreen}
        options={{headerShown: false}}
      />
      <RecipeDetailStack.Screen
        name="SequenceDetailDescription"
        component={SequenceDetailDescriptionScreen}
        options={{headerShown: false}}
      />
    </RecipeDetailStack.Navigator>
  );
};

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
        component={RecipeDetailStackNavigator}
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
        name="IngredientsAdd"
        component={IngredientsAddScreen}
        options={{
          title: '식재료',
          headerShown: false,
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

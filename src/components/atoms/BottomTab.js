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
import IngredientsScreen from '../../pages/Ingredients/IngredientsScreen';
import EfficacyScreen from '../../pages/Ingredients/EfficacyScreen';
import PrepScreen from '../../pages/Ingredients/PrepScreen';
import PrepDetailScreen from '../../pages/Ingredients/PrepDetailScreen';
import EfficacyEditScreen from '../../pages/Ingredients/EfficacyEditScreen';

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

const IngredientsStackNavigator = () => {
  const IngredientsStack = createNativeStackNavigator();

  return (
    <IngredientsStack.Navigator>
      <IngredientsStack.Screen
        name="IngredientsAdd"
        component={IngredientsAddScreen}
        options={{headerShown: false}}
      />
      <IngredientsStack.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{headerShown: false}}
      />

      <IngredientsStack.Screen
        name="Efficacy"
        component={EfficacyScreen}
        options={{headerShown: false}}
      />
      <IngredientsStack.Screen
        name="EfficacyEdit"
        component={EfficacyEditScreen}
        options={{headerShown: false}}
      />
      <IngredientsStack.Screen
        name="Prep"
        component={PrepScreen}
        options={{headerShown: false}}
      />

      <IngredientsStack.Screen
        name="PrepDetail"
        component={PrepDetailScreen}
        options={{headerShown: false}}
      />
    </IngredientsStack.Navigator>
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
        name="IngredientsHome"
        component={IngredientsStackNavigator}
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

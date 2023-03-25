import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../pages/HomeScreen';
import MypageScreen from '../../pages/MypageScreen';
import ReceiptScreen from '../../pages/ReceiptScreen';
import RecipeScreen from '../../pages/RecipeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IngredientsAddScreen from '../../pages/Ingredients/IngredientsAddScreen';
import IngredientsScreen from '../../pages/Ingredients/IngredientsScreen';
import EfficacyScreen from '../../pages/Ingredients/EfficacyScreen';
import PrepScreen from '../../pages/Ingredients/PrepScreen';
import PrepDetailScreen from '../../pages/Ingredients/PrepDetailScreen';
import EfficacyEditScreen from '../../pages/Ingredients/EfficacyEditScreen';
import RecipeDetailStackNavigator from '../../navigations/RecipeDetailStackNavigator';

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

  useEffect(() => {
    // 여기에 FCM 등록 알고리즘 필요
    console.log('bottomTab rendering: ');
  }, []);

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

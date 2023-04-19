import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../pages/HomeScreen';
import MypageScreen from '../../pages/myPage/MypageScreen';
import ReceiptScreen from '../../pages/ReceiptScreen';
import RecipeScreen from '../../pages/RecipeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterMyIngredientsScreen from '../../pages/Ingredients/RegisterMyIngredientsScreen';
import IngredientsScreen from '../../pages/Ingredients/IngredientsScreen';
import EfficacyScreen from '../../pages/Ingredients/EfficacyScreen';
import PrepScreen from '../../pages/Ingredients/PrepScreen';
import PrepDetailScreen from '../../pages/Ingredients/PrepDetailScreen';
import EfficacyEditScreen from '../../pages/Ingredients/EfficacyEditScreen';
import RecipeDetailStackNavigator from '../../navigations/RecipeDetailStackNavigator';
import {Image, Platform, View} from 'react-native';

const RecipeStackNavigator = () => {
  const RecipeStack = createNativeStackNavigator();
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeHome"
        component={RecipeScreen}
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
        name="RegisterMyIngredients"
        component={RegisterMyIngredientsScreen}
        options={{headerShown: false}}
      />
      <IngredientsStack.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{headerShown: false}}
      />
      <IngredientsStack.Screen
        name="Prep"
        component={PrepScreen}
        options={{headerShown: false}}
      />
    </IngredientsStack.Navigator>
  );
};

const ReceiptIcon = focused => {
  return (
    <View
      style={{
        width: 76.8,
        height: 76.8,
        borderRadius: 180,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 61.44,
          height: 61.44,
          borderRadius: 180,
          backgroundColor: '#F09311',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/Receipt.png')}
          style={{width: 30.72, height: 30.72}}
        />
      </View>
    </View>
  );
};

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#f09311',
        tabBarInactiveTintColor: '#a4a4a4',
        tabBarLabelStyle: {
          fontFamily: 'Pretendard Variable',
          fontSize: 11.52,
          fontWeight: 500,
          paddingBottom: Platform.OS === 'ios' ? 1 : 15,
        },
        tabBarStyle: {
          paddingTop: 5,
          height: Platform.OS === 'ios' ? 80 : 67.2,
          ...Platform.select({
            ios: {
              shadowColor: 'rgba(0,0,0)',
              shadowOpacity: 0.23,
              shadowOffset: {
                width: 0,
                height: -9.6,
              },
            },
            android: {
              elevation: 19,
            },
          }),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../../assets/images/HomeActive.png')
                    : require('../../assets/images/Home.png')
                }
                style={{
                  width: 23.04,
                  height: 23.04,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeStackNavigator}
        options={{
          title: '레시피',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../../assets/images/RecipeActive.png')
                    : require('../../assets/images/Recipe.png')
                }
                style={{
                  width: 23.04,
                  height: 23.04,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Receipt"
        component={ReceiptScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return <ReceiptIcon />;
          },
        }}
      />
      <Tab.Screen
        name="IngredientsHome"
        component={IngredientsStackNavigator}
        options={{
          title: '식재료',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../../assets/images/IngredientsActive.png')
                    : require('../../assets/images/Ingredients.png')
                }
                style={{
                  width: 23.04,
                  height: 23.04,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MypageScreen}
        options={{
          title: 'My',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../../assets/images/MypageActive.png')
                    : require('../../assets/images/Mypage.png')
                }
                style={{
                  width: 23.04,
                  height: 23.04,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

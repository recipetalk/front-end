import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeDetailDescriptionScreen from '../pages/recipe/RecipeDetailDescriptionScreen';
import SequenceDetailDescriptionScreen from '../pages/SequenceDetailDescriptionScreen';
import React from 'react';

const RecipeDetailStackNavigator = () => {
  const RecipeDetailStack = createNativeStackNavigator();
  return (
    <RecipeDetailStack.Navigator>
      <RecipeDetailStack.Screen
        name="RecipeDetailDescription"
        component={RecipeDetailDescriptionScreen}
        options={{headerShown: false}}
      />
    </RecipeDetailStack.Navigator>
  );
};

export default RecipeDetailStackNavigator;

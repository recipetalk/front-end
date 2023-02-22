import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import SearchWithFilterHeader from '../components/organisms/RecipeHome/SearchWithFilterHeader';
import RecentRecipeComponent from '../components/templates/RecipeHome/RecentRecipeComponent';

const RecipeScreen = () => {
  return (
    <RecipeHomeScreenContainer>
      <SearchWithFilterHeader />
      <RecentRecipeComponent />
    </RecipeHomeScreenContainer>
  );
};

const RecipeHomeScreenContainer =
  Platform.OS === 'ios' ? styled.SafeAreaView`` : styled.View``;
export default RecipeScreen;

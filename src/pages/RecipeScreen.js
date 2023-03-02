import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import SearchWithFilterHeader from '../components/organisms/RecipeHome/SearchWithFilterHeader';
import RecentRecipeComponent from '../components/organisms/RecipeHome/RecentRecipeComponent';

const RecipeScreen = ({navigation}) => {
  return (
    <RecipeHomeScreenContainer>
      <SearchWithFilterHeader />
      <RecentRecipeComponent navigation={navigation} />
    </RecipeHomeScreenContainer>
  );
};

const RecipeHomeScreenContainer =
  Platform.OS === 'ios'
    ? styled.SafeAreaView`
        margin-bottom: 125px;
      `
    : styled.View`
        margin-bottom: 125px;
      `;
export default RecipeScreen;

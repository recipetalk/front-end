import React from 'react';
import {Image, Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import SearchWithFilterHeader from '../components/organisms/RecipeHome/SearchWithFilterHeader';
import RecentRecipeComponent from '../components/organisms/RecipeHome/RecentRecipeComponent';

const RecipeScreen = ({navigation}) => {
  return (
    <RecipeHomeScreenContainer>
      <SearchWithFilterHeader />
      <RecentRecipeComponent navigation={navigation} />
      <ToRecipeEditNaviButton onPress={() => navigation.push('RecipeEdit')}>
        <Image source={require('../assets/images/ggggector.png')} />
      </ToRecipeEditNaviButton>
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

const ToRecipeEditNaviButton = styled.TouchableOpacity`
  position: absolute;
  width: 55px;
  height: 55px;
  background: #333333;
  border-radius: 100px;
  right: 20px;
  bottom: 20px;

  align-items: center;
  justify-content: center;
`;
export default RecipeScreen;

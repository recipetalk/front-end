import React from 'react';
import {Image, Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import RecipeDetailDescription from '../components/atoms/board/RecipeDetailDescription';

const RecipeDetailDescriptionScreen = ({navigation}) => {
  return (
    <RecipeDetailDescriptionContainer>
      <Header>
        <TouchableOpacity
          style={{padding: 9, width: 15, height: 15}}
          onPress={() => navigation.pop()}>
          <Image
            source={require('../assets/images/Back_w.png')}
            resizeMode="contain"
            style={{width: 15, height: 30}}
          />
        </TouchableOpacity>
      </Header>
      <RecipeDetailDescription />
    </RecipeDetailDescriptionContainer>
  );
};

const RecipeDetailDescriptionContainer =
  Platform.OS === 'ios'
    ? styled.SafeAreaView`
        height: 100%;
        margin-bottom: 125px;
      `
    : styled.View`
        height: 100%;
        margin-bottom: 125px;
      `;

const Header = styled.View`
  width: 100%;
  height: 50px;
  background: #f09311;
`;

export default RecipeDetailDescriptionScreen;

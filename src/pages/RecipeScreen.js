import React from 'react';
import { Platform } from 'react-native';
import styled from "styled-components/native";
import SearchWithFilterHeader from '../components/organisms/RecipeHome/SearchWithFilterHeader';


const RecipeScreen = () => {
  return(
    <RecipeHomeScreenContainer>
      <SearchWithFilterHeader/>
      <InfoScrollContainer>

      </InfoScrollContainer>
    </RecipeHomeScreenContainer>
  )
};

const RecipeHomeScreenContainer = Platform.OS == 'ios' ? styled.SafeAreaView`
`: 

styled.View`
`
;

const InfoScrollContainer = styled.ScrollView`

  background : #FFFFFF;
  width: 100%;
  height : 100%;
`;

export default RecipeScreen;

import React from 'react';
import {Platform} from 'react-native';
import RecipeDetailDescription from '../components/atoms/board/RecipeDetailDescription';
import styled from 'styled-components/native';

const ReceiptScreen = () => {
  return (
    <ReciptScreenContainer>
      <RecipeDetailDescription />
    </ReciptScreenContainer>
  );
};

const ReciptScreenContainer =
  Platform.OS === 'ios' ? styled.SafeAreaView`` : styled.View``;

export default ReceiptScreen;

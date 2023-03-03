import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import IngredientsComponent from '../../components/templates/Ingredients/IngredientsComponent';

const IngredientsScreen = () => {
  return (
    <IngredientsScreenContainer>
      <IngredientsComponent />
    </IngredientsScreenContainer>
  );
};

const IngredientsScreenContainer =
  Platform.OS === 'ios' ? styled.SafeAreaView`` : styled.View``;

export default IngredientsScreen;

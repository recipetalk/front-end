import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import IngredientsAddComponent from '../../components/templates/Ingredients/IngredientsAddComponent';

const IngredientsAddScreen = () => {
  return (
    <IngredientsAddScreenContainer>
      <IngredientsAddComponent />
    </IngredientsAddScreenContainer>
  );
};

const IngredientsAddScreenContainer =
  Platform.OS === 'ios' ? styled.SafeAreaView`` : styled.View``;

export default IngredientsAddScreen;

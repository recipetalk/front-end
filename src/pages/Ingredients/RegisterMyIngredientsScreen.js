import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import RegisterMyIngredientsComponent from '../../components/templates/Ingredients/RegisterMyIngredientsComponent';

const RegisterMyIngredientsScreen = () => {
  return (
    <RegisterMyIngredientsScreenContainer>
      <RegisterMyIngredientsComponent />
    </RegisterMyIngredientsScreenContainer>
  );
};

const RegisterMyIngredientsScreenContainer =
  Platform.OS === 'ios' ? styled.SafeAreaView`` : styled.View``;

export default RegisterMyIngredientsScreen;

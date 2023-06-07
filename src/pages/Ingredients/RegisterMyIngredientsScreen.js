import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import RegisterMyIngredientsComponent from '../../components/templates/Ingredients/RegisterMyIngredientsComponent';

const RegisterMyIngredientsScreen = () => {
  return (
    <>
      <RegisterMyIngredientsScreenContainer edges={['top']} />
      <RegisterMyIngredientsComponent />
    </>
  );
};

const RegisterMyIngredientsScreenContainer = styled.SafeAreaView`
  background: #ffffff;
`;

export default RegisterMyIngredientsScreen;

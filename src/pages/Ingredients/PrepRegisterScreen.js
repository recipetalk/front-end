import React from 'react';
import styled from 'styled-components/native';
import PrepRegisterComponent from '../../components/templates/Ingredients/PrepRegisterComponent';

const PrepRegisterScreen = () => {
  return (
    <PrepEditScreenContainer>
      <PrepRegisterComponent />
    </PrepEditScreenContainer>
  );
};

const PrepEditScreenContainer = styled.SafeAreaView`
  background-color: #ffffff;
  height: 100%;
`;

export default PrepRegisterScreen;

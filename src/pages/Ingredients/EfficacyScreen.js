import React from 'react';
import styled from 'styled-components/native';
import EfficacyComponent from '../../components/templates/Ingredients/EfficacyComponent';

const EfficacyScreen = () => {
  return (
    <EfficacyScreenContainer>
      <EfficacyComponent />
    </EfficacyScreenContainer>
  );
};

const EfficacyScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

export default EfficacyScreen;

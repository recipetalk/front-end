import React from 'react';
import styled from 'styled-components/native';
import IngredientsContent from '../../organisms/Ingredients/IngredientsContent';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';

const IngredientsComponent = () => {
  return (
    <IngredientsComponentContainer>
      <IngredientsHeader />
      <IngredientsContent />
    </IngredientsComponentContainer>
  );
};

const IngredientsComponentContainer = styled.View`
  margin-bottom: 140px;
`;

export default IngredientsComponent;

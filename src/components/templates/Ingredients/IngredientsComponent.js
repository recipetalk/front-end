import React from 'react';
import styled from 'styled-components/native';
import ViewAllMyIngredients from '../../organisms/Ingredients/ViewAllMyIngredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';

const IngredientsComponent = () => {
  return (
    <IngredientsComponentContainer>
      <IngredientsHeader
        title="내 식재료 전체보기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <ViewAllMyIngredients />
    </IngredientsComponentContainer>
  );
};

const IngredientsComponentContainer = styled.View`
  margin-bottom: 140px;
`;

export default IngredientsComponent;

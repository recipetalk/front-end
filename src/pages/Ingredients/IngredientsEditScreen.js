import React from 'react';
import styled from 'styled-components/native';
import DirectlyRegisterIngredients from '../../components/organisms/Ingredients/DirectlyRegisterIngredients';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';
import {editIngredient} from '../../services/Ingredients';

const IngredientsEditScreen = () => {
  const dummy = {
    expirationDate: '2024-05-05',
    ingredientId: 1,
    ingredientName: '감자',
    ingredientState: '생것',
    isChecked: true,
    quantity: '121',
  };

  const test = () => {
    editIngredient()
      .then(res => console.log(res))
      .catch(error => console.error(error.response));
  };

  return (
    <Container>
      <IngredientsHeader
        title="식재료 수정하기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <Test>
        <DirectlyRegisterIngredients item={dummy} />

        <TouchContainer onPress={test}>
          <IngredientRegisterButton>
            <IngredientRegisterButtonText>
              {'식재료 수정하기'}
            </IngredientRegisterButtonText>
          </IngredientRegisterButton>
        </TouchContainer>
      </Test>
    </Container>
  );
};

const Container = styled.SafeAreaView``;

const Test = styled.View`
  margin: 18px;
`;

const IngredientRegisterButton = styled.View`
  background: #f09311;
  border-radius: 8px;
  height: 48px;
  justify-content: center;
`;

const IngredientRegisterButtonText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #ffffff;
`;

const TouchContainer = styled.TouchableOpacity``;

export default IngredientsEditScreen;

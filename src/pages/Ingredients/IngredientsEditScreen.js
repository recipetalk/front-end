import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';

import DirectlyEditIngredients from '../../components/organisms/Ingredients/DirectlyEditIngredients';
import {editIngredient, getTargetIngredient} from '../../services/Ingredients';

const IngredientsEditScreen = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const [item, setItem] = useState();

  const [ingredientsStatusInfo, setIngredientsStatusInfo] = useState('');

  const [ingredientsInfo, setIngredientsInfo] = useState({
    ingredientName: '',
    expirationDate: '',
    quantity: '',
  });

  const edit = () => {
    const editData = {
      id: router.params.id,
      state: ingredientsStatusInfo,
      quantity: ingredientsInfo.quantity,
      expirationDate: ingredientsInfo.expirationDate,
    };

    editIngredient(editData)
      .then(res => {
        if (res.request.status === 200) {
          navigation.goBack();
        }
      })
      .catch(error => console.error(error.response));
  };

  useEffect(() => {
    getTargetIngredient(router.params.id)
      .then(res => {
        setItem(JSON.parse(res.request._response));
      })
      .catch(error => console.error(error.response));
  }, [router.params.id]);

  useEffect(() => {
    if (item !== undefined) {
      setIngredientsStatusInfo(item.state);
      setIngredientsInfo({
        ingredientName: item.ingredientName,
        expirationDate: item.expirationDate,
        quantity: item.quantity,
      });
    }
  }, [item]);

  if (item === undefined) {
    return null;
  }

  return (
    <Container>
      <IngredientsHeader
        title="식재료 수정하기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <CustomView>
        <DirectlyEditIngredients
          item={item}
          ingredientsInfo={ingredientsInfo}
          ingredientsStatusInfo={ingredientsStatusInfo}
          setIngredientsInfo={setIngredientsInfo}
          setIngredientsStatusInfo={setIngredientsStatusInfo}
          readOnly={true}
        />
        <TouchContainer onPress={edit}>
          <IngredientRegisterButton>
            <IngredientRegisterButtonText>
              {'식재료 수정하기'}
            </IngredientRegisterButtonText>
          </IngredientRegisterButton>
        </TouchContainer>
      </CustomView>
    </Container>
  );
};

const Container = styled.SafeAreaView``;

const CustomView = styled.View`
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

import React from 'react';
import styled from 'styled-components/native';
import ViewAllMyIngredients from '../../organisms/Ingredients/ViewAllMyIngredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';

const IngredientsComponent = () => {
  const navigation = useNavigation();
  return (
    <IngredientsComponentContainer>
      <IngredientsHeader
        title="내 식재료 전체보기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <ViewAllMyIngredients />
      <PrepRegisterButton onPress={() => navigation.push('PrepRegister')}>
        <Image source={require('../../../assets/images/ggggector.png')} />
      </PrepRegisterButton>
    </IngredientsComponentContainer>
  );
};

const IngredientsComponentContainer = styled.View`
  margin-bottom: 300px;
`;

const PrepRegisterButton = styled.TouchableOpacity`
  position: absolute;
  width: 55px;
  height: 55px;
  background: #333333;
  border-radius: 100px;
  right: 20px;
  bottom: 20px;

  align-items: center;
  justify-content: center;
`;
export default IngredientsComponent;

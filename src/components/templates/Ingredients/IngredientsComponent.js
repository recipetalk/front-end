import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import ViewAllMyIngredients from '../../organisms/Ingredients/ViewAllMyIngredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {resetIngredients} from '../../../store/Ingredients/IngredientsSlice';

const IngredientsComponent = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetIngredients());
  }, [dispatch, isFocused]);

  return (
    <IngredientsComponentContainer>
      <IngredientsHeader
        title="내 식재료 전체보기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <ViewAllMyIngredients />
      <PrepRegisterButton
        onPress={() => navigation.push('RegisterMyIngredients')}>
        <Image source={require('../../../assets/images/ggggector.png')} />
      </PrepRegisterButton>
    </IngredientsComponentContainer>
  );
};

const IngredientsComponentContainer = styled.View`
  margin-bottom: 300px;
  height: 720px;
  height: 100%;
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

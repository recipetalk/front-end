import React from 'react';
import styled from 'styled-components/native';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const IngredientList = props => {
  const navigation = useNavigation();
  return (
    <Container>
      <Label>{props.item.ingredientName}</Label>

      <IngredientsItemETCInfo>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Efficacy', {
              ingredientID: props.item.ingredientId,
            })
          }>
          <EfficacyText>효능 및 정보</EfficacyText>
        </TouchableOpacity>
        <Text> | </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Prep', {ingredientID: props.item.ingredientId})
          }>
          <PrepText>손질법 보기</PrepText>
        </TouchableOpacity>
      </IngredientsItemETCInfo>
    </Container>
  );
};

const IngredientsItemETCInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
`;

const Container = styled.View`
  width: 100%;
  margin-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: 500;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const PrepText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #666666;
`;
const EfficacyText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;

  font-family: 'Pretendard Variable';
  text-align: center;

  color: #666666;
`;

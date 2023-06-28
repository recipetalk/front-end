import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {Ingredient} from '../../molecules/Recipe/Ingredient';

export const IngredientList = ({data}) => {
  return (
    <Container>
      <IngredientTitle>재료</IngredientTitle>
      <List>
        {data.map((v, k) => {
          return (
            <Ingredient name={v.name} quantity={v.quantity} isHas={v.isHas} />
          );
        })}
      </List>
    </Container>
  );
};

const List = styled.View`
  height: auto;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 7%;
`;

const IngredientTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  margin-top: 18px;
  font-family: 'Pretendard Variable';
  color: #666666;
  padding-left: 5%;
`;

const Container = styled.View`
  width: 100%;
  background: #ffffff;
  margin-top: 1px;
  margin-bottom: 10px;
  padding-top: 10px;
`;

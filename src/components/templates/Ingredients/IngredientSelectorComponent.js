import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {getSearchIngredient} from '../../../services/Ingredients';
import {useDispatch} from 'react-redux';
import {
  initSaveIngredientToTarget,
  setSaveIngredientToTarget,
} from '../../../store/Ingredients/SelectedByFindIngredientSlice';
import ingredientsComponent from './IngredientsComponent';

export const IngredientSelectorComponent = ({
  targetIngredientName,
  setCheckedItem,
  index,
}) => {
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => {
      getSearchIngredient(targetIngredientName).then(result => {
        const data = JSON.parse(result.request._response);
        setSearchResult(() => data);
      });
    }, 600);

    return () => clearTimeout(id);
  }, [targetIngredientName]);

  const saveInfo = item => {
    //초기화 부터 하고
    dispatch(initSaveIngredientToTarget());

    let infos = {
      ingredientId: item.ingredientId,
      ingredientName: item.ingredientName,
      index: index,
    };

    setCheckedItem(infos.ingredientName);
    //저장
    dispatch(setSaveIngredientToTarget(infos));
  };

  return (
    <Container>
      {searchResult.map(item => (
        <TouchableOpacity
          onPress={() => saveInfo(item)}
          style={{alignItems: 'center', flexDirection: 'row'}}>
          <ItemBox>
            <ItemLabel>{item.ingredientName}</ItemLabel>
          </ItemBox>
          <VerticalBar />
        </TouchableOpacity>
      ))}
    </Container>
  );
};

const ItemBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const ItemLabel = styled.Text`
  font-size: 14px;
  font-family: 'Pretendard Variable';
  font-weight: 500;
`;

const VerticalBar = styled.View`
  width: 1px;
  height: 70%;
  background-color: #e5e5e5;
`;

const Container = styled.View`
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  border: 1px solid #e1e1e1;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
  flex-direction: row;
  gap: 10px;
`;

import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {getSearchIngredient} from '../../../services/Ingredients';
import {useDispatch} from 'react-redux';
import {
  initSaveIngredientToTarget,
  setSaveIngredientToTarget,
} from '../../../store/Ingredients/SelectedByFindIngredientSlice';
import ingredientsComponent from './IngredientsComponent';

export const IngredientSelectorComponent = ({targetIngredientName, index}) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLast, setLast] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => {
      init();
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

    dispatch(setSaveIngredientToTarget(infos));
  };

  const init = async () => {
    setLoading(true);
    setSearchResult([]);
    getSearchIngredient(targetIngredientName, 0).then(result => {
      const data = JSON.parse(result.request._response);
      console.log(data);
      setSearchResult(data.content);
      setPageNum(1);
      setLast(data.last);
    });
    setLoading(false);
  };

  const onRequest = async () => {
    await setLoading(true);
    await getSearchIngredient(targetIngredientName, pageNum).then(result => {
      const data = JSON.parse(result.request._response);
      setSearchResult(state => state.concat(data.content));
      setPageNum(page => page + 1);
      setLast(data.last);
    });
    await setLoading(false);
  };

  const handleScroll = event => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const reachedEnd =
      contentOffset.x + layoutMeasurement.width >= contentSize.width;

    if (reachedEnd && !loading && !isLast) {
      onRequest();
    }
  };

  return (
    <Container
      horizontal={true}
      onScroll={handleScroll}
      keyboardShouldPersistTaps={'always'}
      scrollEventThrottle={16}>
      <FlatList
        keyboardShouldPersistTaps={'always'}
        scrollEnabled={false}
        data={searchResult}
        horizontal={true}
        renderItem={({item}) => renderItem(item, saveInfo)}
        keyExtractor={_ => String(_.ingredientId)}
      />
    </Container>
  );
};

const renderItem = (item, saveInfo) => {
  return (
    <TouchableOpacity
      onPress={() => saveInfo(item)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <ItemBox>
        <ItemLabel>{item.ingredientName}</ItemLabel>
      </ItemBox>
      <VerticalBar />
    </TouchableOpacity>
  );
};

const ItemBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
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

const Container = styled.ScrollView`
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  border: 1px solid #e1e1e1;

  flex-direction: row;
`;

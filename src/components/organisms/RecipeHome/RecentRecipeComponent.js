import React, {memo, useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, FlatList, View} from 'react-native';
import BoardComponent from '../../atoms/board/BoardComponent';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {loadLoginFromStorage} from '../../../services/repository/AutoLogin';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import {determinePageEnd} from '../../../utils/determinePageEnd';

export default function RecentRecipeComponent({navigation}) {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [last, setLast] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const firstClicked = useSelector(state => state.firstFilterClicked.value);
  const sortCategory = useSelector(state => state.sortCategory.value);
  const situationCategory = useSelector(state => state.situationCategory.value);
  const title = useSelector(state => state.searchValue.value);
  useEffect(() => {
    init();
  }, [firstClicked, sortCategory, situationCategory, title]);

  const firstFilter = [
    {
      value: 'NEW',
    },
    {
      value: 'POPULAR',
    },
    {
      value: 'FOLLOW',
    },
  ];

  const init = async () => {
    await setLoading(() => true);
    console.log(
      title,
      firstFilter[firstClicked.key - 1].value,
      sortCategory,
      situationCategory,
      limit,
    );
    await getDynamicRecipes(
      title,
      firstFilter[firstClicked.key - 1].value,
      sortCategory,
      situationCategory,
      0,
      limit,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        setData(data);
        setLast(() => determinePageEnd(data.length, limit));
        console.log();
        setOffset(() => 20);
      })
      .catch(err => {
        console.log(err.response);
      });
    await setLoading(() => false);
  };

  const onRefresh = async () => {
    await setRefresh(true);
    await init().then();
    setTimeout(() => setRefresh(false), 1000);
  };

  const onRequest = async () => {
    await setLoading(() => true);
    await getDynamicRecipes(
      title,
      firstFilter[firstClicked.key - 1].value,
      sortCategory,
      situationCategory,
      offset,
      limit,
    ).then(res => {
      const data = JSON.parse(res.request._response);
      setData(recipes => recipes.concat(data));
      setLast(() => determinePageEnd(data.length, limit));
      setOffset(offset => offset + limit);
      console.log(data);
    });
    setLoading(() => false);
  };

  if (data == null) {
    return (
      <EmptyContainer>
        <ActivityIndicator color={'#f09311'} size="large" />
      </EmptyContainer>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyContainer>
        <EmptyLabel>검색한 레시피가 존재하지 않습니다.</EmptyLabel>
      </EmptyContainer>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({item}) => (
        <RenderItem item={item} navigation={navigation} />
      )}
      keyExtractor={_ => _?.board?.boardId}
      onRefresh={onRefresh}
      refreshing={isRefresh}
      onEndReached={() => {
        if (loading) {
          return;
        }
        if (!last) {
          onRequest();
        }
      }}
      onEndReachedThreshold={0.6}
    />
  );
}

const RenderItem = ({item, navigation}) => {
  return (
    <View>
      <BoardComponent navigation={navigation} item={item} />
      <HorizonalBar />
    </View>
  );
};

const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
  margin-bottom: 70px;
`;
const EmptyLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #999999;
`;

const HorizonalBar = styled.View`
  border: 3px solid #f5f5f5;
`;

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../components/atoms/board/RadioButton';
import HList from '../../components/organisms/Home/HList';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import {loadLoginFromStorage} from '../../services/repository/AutoLogin';
import {getDynamicRecipes} from '../../services/recipe/Recipe';
import {determinePageEnd} from '../../utils/determinePageEnd';
import {getIngredientPrepByUsername} from '../../services/Ingredients';
import {ActivityIndicator, FlatList} from 'react-native';

export const MyPrepScreen = ({navigation}) => {
  const [firstClicked, setFirstClicked] = useState({key: 1});
  const [prep, setPrep] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [last, setLast] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const dummy = [1, 2, 3, 4, 5];
  const firstFilter = [
    {
      key: 1,
      onPress: () => setFirstClicked({key: 1}),
      title: '최신',
      value: 'NEW',
    },
    {
      key: 2,
      onPress: () => setFirstClicked({key: 2}),
      title: '인기',
      value: 'POPULAR',
    },
  ];

  useEffect(() => {
    init();
  }, [firstClicked]);

  const init = async () => {
    const username = (await loadLoginFromStorage()).username;
    console.log(firstFilter[firstClicked.key - 1].value, 0, limit, username);
    await getIngredientPrepByUsername(
      username,
      firstFilter[firstClicked.key - 1].value,
      0,
      limit,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        console.log(data);
        setPrep(() => data);
        setLast(() => determinePageEnd(data.length, limit));
        setOffset(() => 20);
        data.forEach(res => console.log(res));
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const onRefresh = async () => {
    await setRefresh(true);
    await init();
    setTimeout(() => setRefresh(false), 1000);
  };

  const onRequest = async () => {
    await setLoading(() => true);
    const username = (await loadLoginFromStorage()).username;
    await getIngredientPrepByUsername(
      username,
      firstFilter[firstClicked.key - 1].value,
      offset,
      limit,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        setPrep(recipes => recipes.concat(data));
        setLast(() => determinePageEnd(data.length, limit));
        setOffset(() => offset + limit);
      })
      .catch(err => console.log(err.response));
    await setLoading(() => false);
  };

  if (prep == null) {
    return (
      <EmptyContainer>
        <ActivityIndicator color={'#f09311'} size="large" />
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <NavigationHeader navigation={navigation} title={'재료 손질법 관리'} />
      <HorizontalBar />
      <InnerContainer>
        <FilterPart>
          {firstFilter.map(value => (
            <RadioButton
              onPress={value.onPress}
              backgroundColor={'#D8D8D8'}
              clickedBackgroundColor={'#666666'}
              textColor={'#666666'}
              clickedTextColor={'#D8D8D8'}
              clickedNumber={firstClicked.key}
              item={value}
            />
          ))}
        </FilterPart>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{height: 'auto', paddingBottom: '20%'}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={prep}
          renderItem={({item}) => {
            return <HList value={item} boardSort={'TRIMMING'} />;
          }}
          keyExtractor={_ => _.board.boardId}
          onRefresh={onRefresh}
          refreshing={isRefresh}
          onEndReached={() => {
            if (last) {
              onRequest();
            }
          }}
          onEndReachedThreshold={0.6}
        />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

const InnerContainer = styled.View`
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
  height: 100%;
`;

const FilterPart = styled.View`
  width: auto;
  height: auto;
  flex-direction: row;
  margin-top: 10px;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;

const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
  margin-bottom: 70px;
`;

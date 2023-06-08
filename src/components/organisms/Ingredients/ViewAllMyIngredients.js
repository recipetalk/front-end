import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {getMyIngredientPage} from '../../../services/Ingredients';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import IngredientsItem from './IngredientsItem';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import {determinePageEnd} from '../../../utils/determinePageEnd';

const ViewAllMyIngredients = () => {
  const isFocused = useIsFocused();
  const [myIngredients, setMyIngredients] = useState(null);

  const [oneItemState, setOneItemState] = useState(undefined);
  const [twoItemState, setTwoItemState] = useState(undefined);
  const [threeItemState, setThreeItemState] = useState(undefined);
  const [deleteItem, setDeleteItem] = useState(false);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const oneItem = [
    {label: '최신순', value: 'new'},
    {label: '과거순', value: 'old'},
  ];
  const twoItem = [
    {label: '오름차순', value: 'alphabet_asc'},
    {label: '내림차순', value: 'alphabet_desc'},
  ];
  const threeItem = [
    {
      label: '가까운 순서보기(임박)',
      value: 'expiry_date_immi',
    },
    {
      label: '여유로운 순서보기(여유)',
      value: 'expiry_date_spare',
    },
    {
      label: '이미 지난거 보기(지남)',
      value: 'expired',
    },
  ];

  const deleteCallback = useCallback(() => {
    setDeleteItem(true);
  }, []);

  useEffect(() => {
    setOneItemState('new');
    setDeleteItem(false);
    init('new');
  }, [deleteItem]);

  useEffect(() => {
    if (oneItemState !== undefined) {
      setTwoItemState(undefined);
      setThreeItemState(undefined);
      init(oneItemState);
    }
  }, [oneItemState]);

  useEffect(() => {
    if (twoItemState !== undefined) {
      setOneItemState(undefined);
      setThreeItemState(undefined);
      init(twoItemState);
    }
  }, [twoItemState]);

  useEffect(() => {
    if (threeItemState !== undefined) {
      setOneItemState(undefined);
      setTwoItemState(undefined);
      init(threeItemState);
    }
  }, [threeItemState]);

  const init = async type => {
    await setLoading(() => true);
    await getMyIngredientPage(0, type)
      .then(res => {
        const data = JSON.parse(res.request._response);
        setMyIngredients(data.content);
        setLast(() => data.last);
        setPage(1);
      })
      .catch(err => {
        console.log(err.response);
      });
    await setLoading(() => false);
  };

  const onRefresh = async () => {
    await setRefresh(true);
    await init(oneItemState, twoItemState, threeItemState).then();
    setTimeout(() => setRefresh(false), 1000);
  };

  const onRequest = async () => {
    await setLoading(() => true);
    await getMyIngredientPage(
      page,
      oneItemState,
      twoItemState,
      threeItemState,
    ).then(res => {
      const data = JSON.parse(res.request._response);
      setMyIngredients(ingredients => ingredients.concat(data.content));
      setLast(() => data.last);
      setPage(page => page + 1);
    });
    setLoading(() => false);
  };

  if (myIngredients === null) {
    return null;
  }

  return (
    <>
      <DropDownPickerContainer>
        <View>
          <DropDownPickerComponent
            width="80px"
            items={oneItem}
            value={oneItemState}
            placeholder="등록일"
            setValue={setOneItemState}
            minHeight={'35px'}
          />
        </View>
        <View>
          <DropDownPickerComponent
            width="100px"
            items={twoItem}
            value={twoItemState}
            placeholder="가나다"
            setValue={setTwoItemState}
            minHeight={'35px'}
          />
        </View>
        <View>
          <DropDownPickerComponent
            width="170px"
            items={threeItem}
            value={threeItemState}
            placeholder="소비기한(임박)"
            setValue={setThreeItemState}
            minHeight={'35px'}
          />
        </View>
      </DropDownPickerContainer>

      {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
      {/*  <MyIngredientsTitle>나의 식재료</MyIngredientsTitle>*/}
      {/*  {myIngredients.map((item, i) => {*/}
      {/*    return (*/}
      {/*      <IngredientsItem*/}
      {/*        deleteCallback={deleteCallback}*/}
      {/*        key={i}*/}
      {/*        item={item}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ScrollView>*/}
      <FlatList
        contentContainerStyle={{
          paddingLeft: '3%',
          paddingRight: '3%',
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
        data={myIngredients}
        renderItem={({item}) => (
          <IngredientsItem deleteCallback={deleteCallback} item={item} />
        )}
        keyExtractor={_ => _?.userHasIngredientId}
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
        ListEmptyComponent={
          <InnerContainer>
            <Text
              style={{
                fontStyle: 'normal',
                fontFamily: 'Pretendard Variable',
                fontSize: 14,
                fontWeight: 500,
                color: '#333333',
              }}>
              식재료가 없습니다.
            </Text>
          </InnerContainer>
        }
        onEndReachedThreshold={0.6}
      />
    </>
  );
};

const DropDownPickerContainer = styled.View`
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 18px;
  z-index: 2;
  gap: 5px;
`;

const MyIngredientsTitle = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  padding: 18px;
  color: #333333;
  font-family: 'Pretendard Variable';
`;

const InnerContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default ViewAllMyIngredients;

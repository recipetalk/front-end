import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {getMyIngredientPage} from '../../../services/Ingredients';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import IngredientsItem from './IngredientsItem';

const ViewAllMyIngredients = () => {
  const isFocused = useIsFocused();
  const [myIngredients, setMyIngredients] = useState(null);

  const [oneItemState, setOneItemState] = useState('');
  const [twoItemState, setTwoItemState] = useState('');
  const [threeItemState, setThreeItemState] = useState('');
  const [deleteItem, setDeleteItem] = useState(false);

  const oneItem = [
    {placeholder: '등록일', label: '최신순', value: 'new'},
    {placeholder: '등록일', label: '과거순', value: 'old'},
  ];
  const twoItem = [
    {placeholder: '가나다', label: '오름차순', value: 'alphabet_asc'},
    {placeholder: '가나다', label: '내림차순', value: 'alphabet_desc'},
  ];
  const threeItem = [
    {
      placeholder: '소비기한',
      label: '가까운 순서보기(임박)',
      value: 'expiry_date_immi',
    },
    {
      placeholder: '소비기한',
      label: '여유로운 순서보기(여유)',
      value: 'expiry_date_spare',
    },
  ];

  const deleteCallback = useCallback(() => {
    setDeleteItem(true);
  }, []);

  useEffect(() => {
    setOneItemState('new');
    setDeleteItem(false);
  }, [isFocused, deleteItem]);

  useEffect(() => {
    if (oneItemState !== '') {
      getMyIngredientPage(oneItemState)
        .then(res => setMyIngredients(res.data.content))
        .catch(error => console.error(error.response));

      setOneItemState('');
    }

    if (twoItemState !== '') {
      getMyIngredientPage(twoItemState)
        .then(res => setMyIngredients(res.data.content))
        .catch(error => console.error(error.response));

      setTwoItemState('');
    }

    if (threeItemState !== '') {
      getMyIngredientPage(threeItemState)
        .then(res => setMyIngredients(res.data.content))
        .catch(error => console.error(error.response));

      setThreeItemState('');
    }
  }, [oneItemState, twoItemState, threeItemState]);

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
          />
        </View>
        <View>
          <DropDownPickerComponent
            width="100px"
            items={twoItem}
            value={twoItemState}
            placeholder="가나다"
            setValue={setTwoItemState}
          />
        </View>
        <View>
          <DropDownPickerComponent
            width="170px"
            items={threeItem}
            value={threeItemState}
            placeholder="소비기한(임박)"
            setValue={setThreeItemState}
          />
        </View>
      </DropDownPickerContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MyIngredientsTitle>나의 식재료</MyIngredientsTitle>
        {myIngredients.map((item, i) => {
          return (
            <IngredientsItem
              deleteCallback={deleteCallback}
              key={i}
              item={item}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const DropDownPickerContainer = styled.View`
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 18px;
  z-index: 2;
`;

const MyIngredientsTitle = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  padding: 18px;
  color: #333333;
  font-family: 'Pretendard Variable';
`;

export default ViewAllMyIngredients;

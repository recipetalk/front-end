import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import IngredientsItem from './IngredientsItem';

const ViewAllMyIngredients = () => {
  const ingredientsList = useSelector(state => state.ingredients);

  const oneItem = [
    {placeholder: '등록일', label: '최신순', value: '최신순'},
    {placeholder: '등록일', label: '과거순', value: '과거순'},
  ];
  const twoItem = [
    {placeholder: '가나다', label: '오름차순', value: '오름차순'},
    {placeholder: '가나다', label: '내림차순', value: '내림차순'},
  ];
  const threeItem = [
    {
      placeholder: '소비기한',
      label: '가까운 순서 보기(임박)',
      value: '가까운 순서 보기(임박)',
    },
    {
      placeholder: '소비기한',
      label: '여유로운 순서 보기(여유)',
      value: '여유로운 순서 보기(여유)',
    },
  ];
  return (
    <>
      <DropDownPickerContainer>
        <View>
          <DropDownPickerComponent width="90px" items={oneItem} />
        </View>
        <View>
          <DropDownPickerComponent width="90px" items={twoItem} />
        </View>
        <View>
          <DropDownPickerComponent width="160px" items={threeItem} />
        </View>
      </DropDownPickerContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MyIngredientsTitle>나의 식재료</MyIngredientsTitle>
        {ingredientsList.map((item, i) => {
          return <IngredientsItem key={i} item={item} />;
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
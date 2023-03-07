import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import IngredientsItem from './IngredientsItem';

const IngredientsContent = () => {
  const dummy = [1, 2, 3, 4, 5];
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
      <Content>
        <View>
          <DropDownPickerComponent width="90px" items={oneItem} />
        </View>
        <View>
          <DropDownPickerComponent width="90px" items={twoItem} />
        </View>
        <View>
          <DropDownPickerComponent width="160px" items={threeItem} />
        </View>
      </Content>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContentTitle>나의 식재료</ContentTitle>
        {dummy.map((v, i) => {
          return <IngredientsItem key={i} />;
        })}
      </ScrollView>
    </>
  );
};

const Content = styled.View`
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 18px;
  z-index: 2;
`;

const ContentTitle = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  padding: 18px;
  color: #333333;
`;

export default IngredientsContent;

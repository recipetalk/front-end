import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import SearchInput from '../components/atoms/SearchInput';

const SearchScreen = () => {
  const dummyCategory = [
    '🍖고기파티',
    '🥗1인가구',
    '5분완성',
    '건강',

    '🥗1인가구',
    '🍖고기파티',
    '건강',
    '5분완성',

    '건강',
    '🍖고기파티',
    '5분완성',
    '🥗1인가구',
  ];
  return (
    <SearchScreenContainer>
      <Back source={require('../assets/images/Back.png')} />
      <Logo source={require('../assets/images/Logo_o.png')} />
      <SearchInput />
      <TotalCategory>전체 카테고리</TotalCategory>
      <TotalCategoryContainer>
        {dummyCategory.map((v, i) => {
          return (
            <CategoryItem>
              <Text key={i}>{v}</Text>
            </CategoryItem>
          );
        })}
      </TotalCategoryContainer>
    </SearchScreenContainer>
  );
};

const SearchScreenContainer = styled.View`
  margin: 0 15px 0 15px;
`;

const Back = styled.Image``;
const Logo = styled.Image`
  width: 110px;
  margin: 15px auto 18px;
`;

const TotalCategory = styled.Text`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #a9a9a9;
  margin-top: 50px;
`;

const TotalCategoryContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
  padding: 10px;
`;

const CategoryItem = styled.View`
  padding: 14px 13px;
  height: 45px;

  background: #ffffff;

  border: 1px solid #d8d8d8;
  border-radius: 8px;
`;
export default SearchScreen;

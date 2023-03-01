import React from 'react';
import styled from 'styled-components/native';

const IngredientsHeader = () => {
  return (
    <Header>
      <Back source={require('../../../assets/images/Back.png')} />
      <HeaderTitle>내 식재료</HeaderTitle>
    </Header>
  );
};

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
  background-color: #ffffff;
`;

const Back = styled.Image`
  margin-right: 20px;
`;

const HeaderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
`;
export default IngredientsHeader;

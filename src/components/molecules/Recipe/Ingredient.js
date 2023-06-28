import React from 'react';
import styled from 'styled-components/native';

export const Ingredient = ({name, quantity, isHas}) => {
  return (
    <Container>
      <Item>
        <Name isHas={isHas} numberOfLines={1} ellipsizeMode={'tail'}>
          {name}
        </Name>
        <Quantity numberOfLines={1} ellipsizeMode={'tail'}>
          {quantity}
        </Quantity>
      </Item>
      <HorizontalBar />
    </Container>
  );
};

const Item = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Container = styled.View`
  width: 46%;
`;

const Name = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  width: 50%;
  color: ${props => (props.isHas ? '#f09311' : '#666666')};
`;

const Quantity = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #a0a0a0;
  width: 50%;
  text-align: right;
`;

const HorizontalBar = styled.View`
  width: 100%;
  background: #e1e1e1;
  height: 1px;
`;

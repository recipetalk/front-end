import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const AList = props => {
  return (
    <AListContainer>
      <Text>{props.value}</Text>
    </AListContainer>
  );
};

const AListContainer = styled.SafeAreaView`
  width: 83px;
  height: 66px;
  border-radius: 7px;
  border: 1px solid black;
  margin-right: 12px;
`;

export default AList;

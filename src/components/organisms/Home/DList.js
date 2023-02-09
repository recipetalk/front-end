import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const DList = props => {
  return (
    <DListContainer>
      <Text>{props.value}</Text>
    </DListContainer>
  );
};

const DListContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 12px;

  width: 360px;
  height: 124px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

export default DList;

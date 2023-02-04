import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

const AList = props => {
  console.log('alist', props.value);
  return (
    <AListContainer>
      <Text>{props.value}</Text>
    </AListContainer>
  );
};

const AListContainer = styled(SafeAreaView)`
  width: 83px;
  height: 66px;
  border-radius: 7px;
  background-color: gray;
`;
export default AList;

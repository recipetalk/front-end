import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

const AComponent = () => {
  const dummy = [1, 2, 3, 4];
  return (
    <AComponentContainer>
      {dummy.map((v, i) => {
        <View />;
      })}
    </AComponentContainer>
  );
};

const AComponentContainer = styled(SafeAreaView)`
  width: 83px;
  height: 66px;
  border-radius: 7px;
  border: 1px solid black;
`;
export default AComponent;

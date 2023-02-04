import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

const EComponent = () => {
  return (
    <EComponentContainer>
      <CustomText>1인 가구 레시피</CustomText>
      <CustomView />
    </EComponentContainer>
  );
};

const EComponentContainer = styled(SafeAreaView)`
  border: 1px solid black;
  margin-top: 17px;
`;
const CustomText = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin: auto;
`;
const CustomView = styled(View)`
  width: 323px;
  height: 170px;

  border-radius: 8px;
  border: 1px solid black;
  margin: auto;
`;
export default EComponent;

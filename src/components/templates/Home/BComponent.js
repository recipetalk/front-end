import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

const BComponent = () => {
  return (
    <BComponentContainer>
      <CustomText>오늘 저녁 이거 어때요?</CustomText>
      <CustomView />
    </BComponentContainer>
  );
};

const BComponentContainer = styled(SafeAreaView)`
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
export default BComponent;

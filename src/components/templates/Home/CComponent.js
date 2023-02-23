import React from 'react';
import styled from 'styled-components/native';

const CComponent = () => {
  return (
    <CComponentContainer>
      <CustomText>C 컴포넌트입니다.</CustomText>
      <CustomView />
    </CComponentContainer>
  );
};

const CComponentContainer = styled.SafeAreaView`
  margin-top: 17px;
`;
const CustomText = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
const CustomView = styled.View`
  width: 100%;
  height: 170px;

  border-radius: 8px;
  border: 1px solid black;
  margin: auto;
`;
export default CComponent;

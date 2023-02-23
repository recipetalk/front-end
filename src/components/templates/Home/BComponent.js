import React from 'react';
import styled from 'styled-components/native';

const BComponent = () => {
  return (
    <BComponentContainer>
      <Header>
        <CustomText>오늘 저녁 이거 어때요?</CustomText>
        <ViewMoreBtn>
          <ViewMoreText>더보기</ViewMoreText>
        </ViewMoreBtn>
      </Header>
      <CustomView />
    </BComponentContainer>
  );
};

const BComponentContainer = styled.SafeAreaView`
  margin-top: 17px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 13px;
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

const ViewMoreBtn = styled.TouchableOpacity``;
const ViewMoreText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #a9a9a9;
`;
export default BComponent;

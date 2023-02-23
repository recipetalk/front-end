import React from 'react';
import styled from 'styled-components/native';
import EList from '../../organisms/Home/EList';

const EComponent = () => {
  const dummy = [
    {
      title: 1,
      content: 'aaaa',
    },
    {
      title: 2,
      content: 'abbbbb',
    },
    {
      title: 3,
      content: 'ccccc',
    },
    {
      title: 4,
      content: 'adddd',
    },
    {
      title: 5,
      content: 'aeeeeeee',
    },
    {
      title: 6,
      content: 'ddddd',
    },
  ];
  return (
    <EComponentContainer>
      <Header>
        <CustomText>1인 가구 레시피</CustomText>
        <ViewMoreBtn>
          <ViewMoreText>더보기</ViewMoreText>
        </ViewMoreBtn>
      </Header>
      <EList value={dummy} />
    </EComponentContainer>
  );
};

const EComponentContainer = styled.SafeAreaView`
  margin-top: 17px;
  margin-bottom: 70px;
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

const ViewMoreBtn = styled.TouchableOpacity``;
const ViewMoreText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #a9a9a9;
`;
export default EComponent;

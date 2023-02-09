import React from 'react';
import styled from 'styled-components';
import DList from '../../organisms/Home/DList';

const DComponent = () => {
  const dummy = [1, 2, 3, 4, 5];
  return (
    <DComponentContainer>
      <Header>
        <CustomText>인기 레시피 TOP</CustomText>
        <ViewMoreBtn>
          <ViewMoreText>더보기</ViewMoreText>
        </ViewMoreBtn>
      </Header>

      {dummy.map((v, i) => {
        return <DList key={i} value={v} />;
      })}
    </DComponentContainer>
  );
};

const DComponentContainer = styled.SafeAreaView`
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

const ViewMoreBtn = styled.TouchableOpacity``;
const ViewMoreText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #a9a9a9;
`;
export default DComponent;

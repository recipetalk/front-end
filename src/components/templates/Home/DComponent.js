import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import DList from '../../organisms/Home/DList';

const DComponent = () => {
  const dummy = [1, 2, 3, 4, 5];
  return (
    <DComponentContainer>
      <Header>
        <CustomText>최신 레시피</CustomText>
        <ViewMoreBtn>
          <Image source={require('../../../assets/images/More_Arrow.png')} />
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
export default DComponent;

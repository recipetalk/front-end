import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import FItem from '../../organisms/Home/FItem';

const FComponent = () => {
  return (
    <FComponentContainer>
      <Header>
        <CustomText>PICK 레시피</CustomText>
        <ViewMoreBtn>
          <Image source={require('../../../assets/images/More_Arrow.png')} />
        </ViewMoreBtn>
      </Header>
      <FItem />
    </FComponentContainer>
  );
};

const FComponentContainer = styled.SafeAreaView`
  margin-bottom: 30px;
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

export default FComponent;

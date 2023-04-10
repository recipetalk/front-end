import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import HList from '../../organisms/Home/HList';

const HComponent = () => {
  const dummy = [1, 2, 3, 4];
  return (
    <HComponentContainer>
      <Header>
        <CustomText>1인 가구 레시피</CustomText>
        <ViewMoreBtn>
          <Image source={require('../../../assets/images/More_Arrow.png')} />
        </ViewMoreBtn>
      </Header>
      <HListView>
        {dummy.map((v, i) => {
          return <HList key={i} value={v} />;
        })}
      </HListView>
    </HComponentContainer>
  );
};

const HComponentContainer = styled.SafeAreaView`
  margin-bottom: 50px;
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

const HListView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export default HComponent;

import React from 'react';
import {Image, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import AList from '../../organisms/Home/AList';
import EList from '../../organisms/Home/EList';

const EComponent = () => {
  const dummyData = [1, 2, 3, 4, 5];
  return (
    <EComponentContainer>
      <Header>
        <CustomText>인기 레시피 TOP</CustomText>
        <ViewMoreBtn>
          <Image source={require('../../../assets/images/More.png')} />
        </ViewMoreBtn>
      </Header>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {dummyData.map((v, i) => {
          return <EList key={i} value={v} />;
        })}
      </ScrollView>
    </EComponentContainer>
  );
};

const EComponentContainer = styled.SafeAreaView`
  margin-top: 17px;
  margin-bottom: 100px;
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

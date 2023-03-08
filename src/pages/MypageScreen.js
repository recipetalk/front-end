import React from 'react';
import {Platform, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import DetailProfileWithDescription from '../components/atoms/profile/DetailProfileWithDescription';

const MypageScreen = ({navigation}) => {
  return (
    <MypageScreenContainer>
      <Header>
        <HeaderLabel>프로필</HeaderLabel>
      </Header>

      <DetailProfileWithDescription
        nickname="홍길동"
        description="나는 사실 양아치"
        navigation={navigation}
      />
    </MypageScreenContainer>
  );
};

const MypageScreenContainer = styled.SafeAreaView`
  height: 100%;
  background: #fbfbfb;
`;

const Header = styled.View`
  background: #f09311;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const HeaderLabel = styled.Text`
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`;
export default MypageScreen;

import React from 'react';
import styled from 'styled-components/native';
import MypageComponent from '../../components/templates/mypage/MypageComponent';

const MypageScreen = ({navigation}) => {
  return (
    <MypageScreenContainer>
      <MypageComponent navigation={navigation} />
    </MypageScreenContainer>
  );
};

const MypageScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

export default MypageScreen;

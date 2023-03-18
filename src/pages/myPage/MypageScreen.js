import React from 'react';
import styled from 'styled-components/native';
import {editProfile, getProfile} from '../../services/MyPage';
import MypageComponent from '../../components/templates/mypage/MypageComponent';

const MypageScreen = ({navigation}) => {
  const Test1 = () => {
    editProfile({
      nickname: 'test111',
      username: 'test2222',
      description: 'test333',
      profileImg: '',
    }).then(res => console.log('res is', res));
  };

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

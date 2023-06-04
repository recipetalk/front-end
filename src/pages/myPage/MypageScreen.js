import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MypageComponent from '../../components/templates/mypage/MypageComponent';
import MypageHeader from '../../components/organisms/mypage/MypageHeader';
import AlertYesNoButton from '../../components/molecules/AlertYesNoButton';
import {
  deleteLoginToStorage,

} from '../../services/repository/AutoLogin';
import {deleteJwtAccessTokenToStorage} from '../../services/repository/JwtToken';
import {RemoveFcmConnect} from '../../services/fcm/FcmConnect';

const MypageScreen = ({navigation}) => {
  const [alert, setAlert] = useState(false);
  const logoutFunction = async () => {
    setAlert(() => false);

    await RemoveFcmConnect();
    await deleteLoginToStorage();
    await deleteJwtAccessTokenToStorage();
    await navigation.reset({routes: [{name: 'Login'}]});
  };

  return (
    <MypageScreenContainer>
      <MypageHeader navigation={navigation} />
      <MypageComponent navigation={navigation} setAlert={setAlert} />
      {alert ? (
        <AlertYesNoButton
          title={'로그아웃'}
          text={'정말 로그아웃 할까요?'}
          setAlert={setAlert}
          onPress={() => logoutFunction()}
          yesButtonText={'로그아웃'}
        />
      ) : undefined}
    </MypageScreenContainer>
  );
};

const MypageScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

export default MypageScreen;

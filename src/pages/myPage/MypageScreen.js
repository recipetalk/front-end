import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MypageComponent from '../../components/templates/mypage/MypageComponent';
import MypageHeader from '../../components/organisms/mypage/MypageHeader';
import AlertYesNoButton from '../../components/molecules/AlertYesNoButton';
import {
  loadLoginFromStorage,
  saveLoginToStorage,
} from '../../services/domain/AutoLogin';

const MypageScreen = ({navigation}) => {
  const [alert, setAlert] = useState(false);
  const logoutFunction = async () => {
    let user = await loadLoginFromStorage();
    await saveLoginToStorage(user.username, user.password, false);
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
`;

export default MypageScreen;

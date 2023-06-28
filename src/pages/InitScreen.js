import React, {useEffect} from 'react';
import {jsonAPI} from '../services/connect/API';
import {loadLoginFromStorage} from '../services/repository/AutoLogin';
import {saveJwtAccessTokenToStorage} from '../services/repository/JwtToken';
import {RequestFcmConnect} from '../services/fcm/FcmConnect';
import messaging from '@react-native-firebase/messaging';
import {clear} from '../store/signup/Signup';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';

export default function InitScreen({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    async function init() {
      dispatch(clear());
      const loadLoginData = await loadLoginFromStorage();
      console.log('loadLoginData : ', loadLoginData);
      if (
        loadLoginData === undefined ||
        loadLoginData.username == null ||
        loadLoginData.username === ''
      ) {
        setTimeout(() => navigation.reset({routes: [{name: 'Login'}]}), 1000);
        return;
      }

      jsonAPI
        .post('/auth/login', {
          username: loadLoginData.username,
          password: loadLoginData.password,
        })
        .then(async res => {
          //await saveJwtRefreshToStorage(res.headers['refresh-token']);
          await saveJwtAccessTokenToStorage(res.headers.authorization);
          const getToken = await messaging().getToken();
          console.log(getToken);
          await RequestFcmConnect(getToken, true).catch();
          navigation.reset({routes: [{name: 'Home'}]});
        })
        .catch(err => {
          navigation.reset({routes: [{name: 'Login'}]});
        });
    }
    return init();
  }, []);

  return (
    <Container>
      <LabelPart>
        <Label>일상 요리의 시작.</Label>
        <Label>
          <OrangeLabel>레시피톡</OrangeLabel>으로 함께 해요
        </Label>
        <MiniLabel>매일의 요리가 새로워지는 레시피톡</MiniLabel>
      </LabelPart>
      <ActivityIndicator
        style={{marginTop: 100}}
        color="#f09311"
        size={'large'}
      />
      <LogoImage
        source={require('../assets/images/Logo_o.png')}
        resizeMode="cover"
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: black;
  align-items: center;
  position: relative;
`;

const LabelPart = styled.View`
  margin-top: 90px;
  align-items: center;
  gap: 10px;
`;

const Label = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
`;

const OrangeLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: #f09311;
`;

const MiniLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #a9a9a9;
  margin-top: 30px;
`;

const LogoImage = styled.Image`
  width: 100px;
  height: 25px;
  position: absolute;
  bottom: 100px;
`;

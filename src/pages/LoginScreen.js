import React, {useEffect, useState} from 'react';
import SloganText from '../components/atoms/title/recipetalkSlogan';
import styled from 'styled-components/native';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import {Platform} from 'react-native';
import FocusedTextInputBorder from '../components/atoms/FocusedTextInputBorder';
import {jsonAPI} from '../services/connect/API';
import {
  loadLoginFromStorage,
  saveLoginToStorage,
} from '../services/domain/AutoLogin';
import {
  saveJwtAccessTokenToStorage,
  saveJwtRefreshToStorage,
} from '../services/domain/JwtToken';
import AlertYesButton from '../components/molecules/AlertYesButton';

export default function LoginScreen({navigation}) {
  const [autologinChecked, setAutologinChecked] = useState(false);
  const [username, setId] = useState('');
  const [password, setPassword] = useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');

  useEffect(() => {
    async function init() {
      const loadLoginData = await loadLoginFromStorage();
      console.log(loadLoginData);
      setId(loadLoginData.username);
      setPassword(loadLoginData.password);
      setAutologinChecked(loadLoginData.isAutoLogin);

      if (loadLoginData.isAutoLogin === true) {
        jsonAPI
          .post('/auth/login', {
            username: loadLoginData.username,
            password: loadLoginData.password,
          })
          .then(async res => {
            await saveJwtRefreshToStorage(res.headers['refresh-token']);
            await saveJwtAccessTokenToStorage(res.headers.authorization);
            navigation.reset({routes: [{name: 'Home'}]});
          })
          .catch(err => {
            if (err.response.data === 'Invalid Username or Password') {
              setVisibleAlert(true);
              console.log(err.response);
              setAlertTitle('아이디 또는 비밀번호가 잘못되었습니다.');
            } else {
              setVisibleAlert(true);
              setAlertTitle('네트워크 상태가 올바르지 못합니다.');
            }
          });
      }
    }
    init();
  }, []);

  const sendLogin = async () =>
    jsonAPI
      .post('/auth/login', {username: username, password: password})
      .then(async res => {
        console.log('id');
        console.log(username);
        console.log('password');
        console.log(password);
        await saveLoginToStorage(username, password, autologinChecked);
        await saveJwtAccessTokenToStorage(res.headers.authorization);
        await saveJwtRefreshToStorage(res.headers['refresh-token']);

        console.log(res.status);
        navigation.reset({routes: [{name: 'Home'}]});
      })
      .catch(err => {
        if (err.response.data === 'Invalid Username or Password') {
          setVisibleAlert(true);
          console.log(err.response);
          setAlertTitle('아이디 또는 비밀번호가 잘못되었습니다.');
        } else {
          setVisibleAlert(true);
          setAlertTitle(
            '네트워크 상태가 올바르지 못합니다. 레시피톡에 문의해주세요',
          );
        }
      });

  const AutoLogin = () => {
    const styles = StyleSheet.create({
      checkbox:
        Platform.OS === 'ios'
          ? {
              width: 15,
              height: 15,
            }
          : {
              marginRight: -15,
            },
      label: {
        color: 'black',
        marginLeft: Platform.OS === 'ios' ? 10 : 17,
      },
    });

    return (
      <AutoLoginCheckContainer>
        <Checkbox
          value={autologinChecked}
          onValueChange={setAutologinChecked}
          onFillColor="#F09311"
          tintColors={{true: '#F09311', false: '#A4A4A4'}}
          boxType="square"
          tintColor="#A4A4A4"
          onCheckColor="#FFFFFF"
          onTintColor="#F09311"
          style={styles.checkbox}
        />
        <Text style={styles.label}>자동 로그인</Text>
      </AutoLoginCheckContainer>
    );
  };

  return (
    <LoginScreenContainer>
      <ScrollView>
        <LogoImage
          source={require('../assets/images/OrangeLogo.png')}
          resizeMode="contain"
        />
        <SloganText />
        <LoginContainer>
          <LoginLabel>아이디</LoginLabel>
          <FocusedTextInputBorder
            placeholder="아이디를 입력해주세요"
            placeholderTextColor="#a4a4a4"
            setData={setId}
            value={username}
            autoCapitalize="none"
          />
          <LoginLabel>비밀번호</LoginLabel>
          <FocusedTextInputBorder
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
            placeholderTextColor="#a4a4a4"
            setData={setPassword}
            value={password}
            autoCapitalize="none"
          />
          <FindLoginPasswordContainer>
            <TouchableOpacity onPress={() => navigation.push('FindId')}>
              <FindLabel>아이디</FindLabel>
            </TouchableOpacity>
            <FindLabel>/</FindLabel>
            <TouchableOpacity>
              <FindLabel>비밀번호 찾기</FindLabel>
            </TouchableOpacity>

            <AutoLogin />
          </FindLoginPasswordContainer>
        </LoginContainer>

        <LoginButton onPress={() => sendLogin()}>
          <LoginButtonLabel>로그인</LoginButtonLabel>
        </LoginButton>
        <SignButton onPress={() => navigation.navigate('Signup')}>
          <SignButtonLabel>회원가입</SignButtonLabel>
        </SignButton>
        <SimpleLoginContainer
          onPress={() => {
            navigation.navigate('SimpleLogin');
          }}>
          <SimpleLoginLabel>간편로그인으로 시작하기</SimpleLoginLabel>
        </SimpleLoginContainer>
      </ScrollView>
      {visibleAlert ? (
        <AlertYesButton
          title={alertTitle}
          onPress={() => setVisibleAlert(false)}
        />
      ) : undefined}
    </LoginScreenContainer>
  );
}

const LogoImage = styled.Image`
  width: 75px;
  height: 48px;
  margin-left: 16px;
  margin-top: 16px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 90%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  background: #e1e1e1;
  border-radius: 25px;
`;

const FindLoginPasswordContainer = styled.View`
  margin-top: 8px;
  margin-left: 3px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FindLabel = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #666666;
`;

const LoginButtonLabel = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  font-family: 'Pretendard Variable';
  color: #666666;
`;

const SignButtonLabel = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  font-family: 'Pretendard Variable';
  color: #ffffff;
`;

const SignButton = styled.TouchableOpacity`
  width: 90%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 3px auto;
  background: #f09311;
  border-radius: 25px;
`;

const LoginLabel = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  margin-left: 8px;
  color: #666666;
  margin-top: 15px;
`;

const LoginContainer = styled.View`
  width: 90%;
  margin: 30px auto 20px auto;
  gap: 7px;
`;

const SimpleLoginContainer = styled.TouchableOpacity`
  width: 90%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 48px;
`;

const SimpleLoginLabel = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-decoration-line: underline;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const LoginScreenContainer =
  Platform.OS === 'ios'
    ? styled.SafeAreaView`
        height: 100%;
      `
    : styled.View`
        height: 100%;
      `;

const AutoLoginCheckContainer = styled.View`
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// const styles = StyleSheet.create({
//   test: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import styled from 'styled-components/native';
import {Alert, Image, Platform, View} from 'react-native';
import ActiveButton from '../../../components/atoms/board/ActiveButton';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import AlertYesButton from '../../../components/molecules/AlertYesButton';
import {requestFindPassword} from '../../../services/login/Password';

export default function PasswordEmailVerificationScreen({navigation, route}) {
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [isActive, setActive] = useState(true);
  const [alertTitle, setAlertTitle] = useState(null);

  const sendEmail = async navigation => {
    const fcmToken = await messaging().getToken();
    requestFindPassword(
      route.params.email,
      route.params.username,
      fcmToken,
    ).catch(err => {
      if (err.message === 'Network Error') {
        setAlertTitle('네트워크가 올바르지 않습니다.');
        setVisibleAlert(true);
      } else {
        setAlertTitle(err.response.data.errorMessage);
        setVisibleAlert(true);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('foreground alert');
      console.log(remoteMessage);
      if (remoteMessage.data.body === '이메일 인증이 완료되었습니다.') {
        navigation.reset({
          routes: [
            {
              name: 'PasswordModify',
              params: {
                username: route.params.username,
                email: route.params.email,
              },
            },
          ],
        });
      } else {
        setAlertTitle('알수 없는 오류가 발생했습니다. 레시피톡에 문의해주세요');
        setVisibleAlert(true);
      }
    });

    if (Platform.OS === 'android') {
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        setActive(() => false);
        console.log('background alert');
        console.log(remoteMessage);
        navigation.reset({
          routes: [
            {
              name: 'PasswordModify',
              params: {
                username: route.params.username,
                email: route.params.email,
              },
            },
          ],
        });
      });
    }
    setActive(true);
    return unsubscribe;
  }, []);

  return (
    <SignupIdScreenContainer>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>이메일 보냈는지 확인하러 가볼까요?</FirstDescription>
        <Description>이메일이 오지 않았나요?</Description>
        <Description>재전송 버튼을 눌러주세요!{'\n'}</Description>
        <Description>인증이 되었다면 잠시만 기다려주세요!</Description>
      </DescriptionContainer>

      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="재전송"
          LabelSize="17px"
          isActive={isActive}
          onPress={() => {
            sendEmail();
          }}
        />
      </NextButtonContainer>
      {visibleAlert ? (
        <AlertYesButton
          title={alertTitle}
          onPress={() => setVisibleAlert(false)}
        />
      ) : undefined}
    </SignupIdScreenContainer>
  );
}
const Description = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: #333333;
  font-family: 'Pretendard Variable';
`;

const FirstDescription = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  color: #f09311;
  margin-bottom: 15px;
`;

const DescriptionContainer = styled.View`
  width: 90%;
  margin-left: 25px;
  margin-top: 15px;
`;

const SignupIdScreenContainer =
  Platform.OS === 'ios'
    ? styled.SafeAreaView`
        position: relative;
        height: 100%;
        width: 100%;
      `
    : styled.View`
        position: relative;
        height: 100%;
        width: 100%;
      `;

const LoginText = styled.TextInput`
  background: #ffffff;
  border: 1px solid #ededed;
  height: 48px;
  border-radius: 8px;
  padding: 8px;
  width: 70%;
  font-family: 'Pretendard Variable';
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

const NextButtonContainer = styled.View`
  position: relative;

  width: 90%;

  margin-top: 135px;
  margin-left: auto;
  margin-right: auto;

  bottom: -210px;
`;

const TouchableContainer = styled.TouchableOpacity`
  width: 55px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

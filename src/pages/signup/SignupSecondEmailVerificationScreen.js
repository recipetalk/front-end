import styled from 'styled-components/native';
import {Alert, Image, Platform, View} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import AlertYesButton from '../../components/molecules/AlertYesButton';
import {useSelector} from 'react-redux';
import {jsonAPI} from '../../services/connect/API';

export default function SignupSecondEmailVerificationScreen({navigation}) {
  const [visibleAlert, setVisibleAlert] = useState(false);
  const globalSignUp = useSelector(state => state.signUp.value);

  const sendEmailAndConnectAndNextNavigation = async () =>
    jsonAPI
      .get('/auth/verify/' + globalSignUp.email)
      .then(async () => {
        const data = {
          fcmToken: await messaging().getToken(),
          email: globalSignUp.email,
        };
        jsonAPI
          .post('/auth/connect', data)
          .catch(err => console.log(err.response.data));
      })
      .catch(err => console.log(err.response.data));

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification.body === 'ok') {
        jsonAPI
          .post('/auth/signup', globalSignUp)
          .then(() => navigation.navigate('SignupFinish'))
          .catch(err => console.log(err.response));
      } else {
        setVisibleAlert(true);
      }
    });
    return unsubscribe;
  });
  return (
    <SignupIdScreenContainer>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>거의다 왔어요!</FirstDescription>
        <Description>이메일이 오지 않았나요?</Description>
        <Description>재전송 버튼을 눌러주세요!</Description>
      </DescriptionContainer>

      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="재전송"
          LabelSize="17px"
          isActive={true}
          onPress={() => {
            sendEmailAndConnectAndNextNavigation();
          }}
        />
      </NextButtonContainer>
      {visibleAlert ? (
        <AlertYesButton
          title={'다시 한번 요청해주세요 ㅠㅠ'}
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

import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {jsonAPI} from '../../../services/connect/API';
import messaging from '@react-native-firebase/messaging';
import {EmailValidator} from '../../../services/validator/EmailValidator';
import {Image, Platform, View} from 'react-native';
import FocusedTextInputBorder from '../../../components/atoms/FocusedTextInputBorder';
import ActiveButton from '../../../components/atoms/board/ActiveButton';
import styled from 'styled-components/native';
import AlertYesButton from '../../../components/molecules/AlertYesButton';
import {requestFindPassword} from '../../../services/login/Password';

export default function FindPasswordScreen({navigation}) {
  const [localEmail, setLocalEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [localId, setLocalId] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const sendEmailAndNextNavigation = async navigation => {
    const fcmToken = await messaging().getToken();
    requestFindPassword(localEmail, localId, fcmToken)
      .then(() => {
        navigation.push('VerificationPasswordEmail', {
          username: localId,
          email: localEmail,
        });
      })
      .catch(err => {
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
    if (EmailValidator(localEmail)) {
      setValidEmail('ok');
    } else {
      setValidEmail('no');
    }

    if (localEmail.length === 0) {
      setValidEmail('');
    }
  }, [localEmail]);

  return (
    <SignupIdScreenContainer>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>비밀번호를 잃어버리셨나요?</FirstDescription>
        <Description>가입하실 때 사용했던 아이디와</Description>
        <Description>이메일을 입력해 주세요.</Description>
      </DescriptionContainer>

      <LoginContainer>
        <LoginLabel>아이디</LoginLabel>
        <DuplicationAndTextInputContainer>
          <View style={{width: '100%'}}>
            <FocusedTextInputBorder
              placeholder="아이디을 입력해주세요"
              value={localId}
              setData={setLocalId}
            />
          </View>
        </DuplicationAndTextInputContainer>
        <LoginLabel>이메일</LoginLabel>
        <DuplicationAndTextInputContainer>
          <View style={{width: '100%'}}>
            <FocusedTextInputBorder
              style={isValidEmail === 'no' && {borderColor: '#ff665c'}}
              placeholder="이메일을 입력해주세요"
              value={localEmail}
              setData={setLocalEmail}
            />
            {isValidEmail === 'no' && (
              <ValidateLabel>이메일 형식을 맞춰주세요!</ValidateLabel>
            )}
          </View>
        </DuplicationAndTextInputContainer>
      </LoginContainer>
      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="확인"
          LabelSize="17px"
          isActive={isValidEmail === 'ok' && localId.length >= 1}
          onPress={() => {
            sendEmailAndNextNavigation(navigation);
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
  font-family: 'Pretendard Variable';
  color: #333333;
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

const DuplicationAndTextInputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 5px;
`;

const ValidateLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #ff665c;
`;

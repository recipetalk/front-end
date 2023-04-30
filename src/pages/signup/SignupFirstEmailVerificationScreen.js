import styled from 'styled-components/native';
import {Image, Platform, View} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import React, {useEffect, useRef, useState} from 'react';
import {jsonAPI} from '../../services/connect/API';
import AlertYesButton from '../../components/molecules/AlertYesButton';
import equals from '../../services/object/equals';
import FocusedTextInputBorder from '../../components/atoms/FocusedTextInputBorder';
import {EmailValidator} from '../../services/validator/EmailValidator';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {setEmail} from '../../store/signup/Signup';

export default function SignupFirstEmailVerificationScreen({navigation}) {
  const globalEmail = useSelector(state => state.signUp.value.email);
  const dispatch = useDispatch();
  const [localEmail, setLocalEmail] = useState(globalEmail);
  const [isAccess, setAccess] = useState(false);
  const [isValidEmail, setValidEmail] = useState('');
  const [accessEmail, setAccessEmail] = useState(null);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const textRef = useRef();
  const getIsValidEmail = async () => {
    jsonAPI
      .get('/auth/signup/email/' + localEmail)
      .then(response => {
        textRef.current.blur();
        setAccess(true);
        setAccessEmail(localEmail);
        setVisibleAlert(true);
        setValidEmail('ok');
      })
      .catch(err => {
        setAccess(false);
        setAccessEmail(null);
        setVisibleAlert(true);
      });
  };
  const sendEmailAndConnectAndNextNavigation = async navigation =>
    jsonAPI
      .get('/auth/verify/' + localEmail)
      .then(async () => {
        const data = {
          fcmToken: await messaging().getToken(),
          email: localEmail,
        };
        jsonAPI
          .post('/auth/connect', data)
          .then(navigation.push('SignupEmailSecond'))
          .catch(err => console.log(err.response.data));
      })
      .catch(err => console.log(err));

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
        <Image source={require('../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>거의다 왔어요!</FirstDescription>
        <Description>중복 가입 방지를 위해</Description>
        <Description>이메일을 입력해 주세요.</Description>
      </DescriptionContainer>

      <LoginContainer>
        <LoginLabel>이메일</LoginLabel>
        <DuplicationAndTextInputContainer>
          <View style={{width: '76%'}}>
            <FocusedTextInputBorder
              useRef={textRef}
              style={isValidEmail === 'no' && {borderColor: '#ff665c'}}
              placeholder="이메일을 입력해주세요"
              value={localEmail}
              setData={setLocalEmail}
            />
            {isValidEmail === 'no' && (
              <ValidateLabel>이메일 형식을 맞춰주세요!</ValidateLabel>
            )}
          </View>
          <ActiveButton
            width="80px"
            height="48px"
            border_radius="8px"
            LabelInfo={
              !equals(localEmail, accessEmail) ? '중복확인' : '확인완료'
            }
            LabelSize="14px"
            isActive={isValidEmail === 'ok' && !equals(localEmail, accessEmail)}
            onPress={getIsValidEmail}
          />
        </DuplicationAndTextInputContainer>
      </LoginContainer>
      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="전송"
          LabelSize="17px"
          isActive={isAccess && equals(localEmail, accessEmail)}
          onPress={() => {
            dispatch(setEmail(localEmail));
            sendEmailAndConnectAndNextNavigation(navigation);
          }}
        />
      </NextButtonContainer>
      {visibleAlert && isAccess ? (
        <AlertYesButton
          title={'사용할 수 있는 이메일입니다 :)'}
          onPress={() => setVisibleAlert(false)}
        />
      ) : visibleAlert && !isAccess ? (
        <AlertYesButton
          title={'사용할 수 없는 이메일입니다 :('}
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

const LoginText = styled.TextInput`
  background: #ffffff;
  border: 1px solid #ededed;
  height: 48px;
  border-radius: 8px;
  padding: 8px;
  width: 70%;
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

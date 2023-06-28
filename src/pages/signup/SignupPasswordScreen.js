import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Image, Platform} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import FocusedTextInputBorder from '../../components/atoms/FocusedTextInputBorder';
import {PasswordValidator} from '../../services/validator/PasswordValidator';
import equals from '../../services/object/equals';
import {useDispatch, useSelector} from 'react-redux';
import {setPassword} from '../../store/signup/Signup';

export default function SignupPasswordScreen({navigation}) {
  const globalPassword = useSelector(state => state.signUp.value.password);
  const dispatch = useDispatch();
  const [localPassword, setLocalPassword] = useState(globalPassword);
  const [checkPassword, setCheckPassword] = useState(globalPassword);
  const [isValidPassword, setNotValidPassword] = useState('');
  const [isEqualPassword, setEqualPassword] = useState(true);

  useEffect(() => {
    if (PasswordValidator(localPassword)) {
      setNotValidPassword('ok');
    } else {
      setNotValidPassword('no');
    }
    if (localPassword.length === 0) {
      setNotValidPassword('');
    }
  }, [localPassword]);

  useEffect(() => {
    if (equals(localPassword, checkPassword)) {
      setEqualPassword(true);
    } else {
      setEqualPassword(false);
    }
    if (checkPassword.length === 0) {
      setEqualPassword(true);
    }
  }, [localPassword, checkPassword]);

  return (
    <SignupIdScreenContainer>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>중간쯤 이에요!</FirstDescription>
        <Description>비밀번호를</Description>
        <Description>입력해주세요.</Description>
      </DescriptionContainer>

      <LoginContainer>
        <LoginLabel>비밀번호</LoginLabel>
        <FocusedTextInputBorder
          style={isValidPassword === 'no' && {borderColor: '#ff665c'}}
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry={true}
          value={localPassword}
          setData={setLocalPassword}
        />
        {isValidPassword === 'no' && (
          <ValidateLabel>
            영문, 숫자, 특수문자를 포함한 8글자 이상으로 작성해주세요!
          </ValidateLabel>
        )}
        <LoginLabel>비밀번호 확인</LoginLabel>
        <FocusedTextInputBorder
          style={isEqualPassword === false && {borderColor: '#ff665c'}}
          placeholder="비밀번호를 한번 더 입력해주세요"
          secureTextEntry={true}
          value={checkPassword}
          setData={setCheckPassword}
        />
        {!isEqualPassword && (
          <ValidateLabel>비밀번호가 일치하지 않습니다.</ValidateLabel>
        )}
      </LoginContainer>
      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="다음"
          LabelSize="17px"
          isActive={
            isValidPassword === 'ok' && equals(checkPassword, localPassword)
          }
          onPress={() => {
            dispatch(setPassword(localPassword));
            navigation.push('SignupEmailFirst');
          }}
        />
      </NextButtonContainer>
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

const ValidateLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #ff665c;
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

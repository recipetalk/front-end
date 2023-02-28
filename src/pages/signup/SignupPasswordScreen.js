import React from 'react';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import ActiveButton from '../../components/atoms/profile/ActiveButton';

export default function SignupIdScreen({navigation}) {
  const Description = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    color: black;
  `;

  const FirstDescription = styled.Text`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

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
          border: 1px solid green;
        `
      : styled.View`
          position: relative;
          height: 100%;
          border: 1px solid green;
          width: 100%;
        `;

  const LoginText = styled.TextInput`
    background: #ffffff;
    border: 1px solid #ededed;
    height: 48px;
    border-radius: 8px;
    padding: 8px;
  `;

  const LoginLabel = styled.Text`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;

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

    border: 1px solid black;

    bottom: -210px;
  `;

  return (
    <SignupIdScreenContainer>
      <DescriptionContainer>
        <FirstDescription>중간쯤 이에요!</FirstDescription>
        <Description>비밀번호를</Description>
        <Description>입력해주세요.</Description>
      </DescriptionContainer>

      <LoginContainer>
        <LoginLabel>비밀번호</LoginLabel>
        <LoginText placeholder="비밀번호를 입력해주세요" />
        <LoginLabel>비밀번호 확인</LoginLabel>
        <LoginText
          placeholder="비밀번호를 한번 더 입력해주세요"
          secureTextEntry={true}
        />
      </LoginContainer>
      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="다음"
          LabelSize="17px"
          onPress={() => navigation.navigate('SignupNickname')}
        />
      </NextButtonContainer>
    </SignupIdScreenContainer>
  );
}

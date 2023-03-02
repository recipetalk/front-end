import React from 'react';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';

export default function SignupNicknameScreen({navigation}) {
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
    width: 70%;
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

  const DuplicationAndTextInputContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
  `;

  const NextButtonContainer = styled.View`
    position: relative;

    width: 90%;

    margin-left: auto;
    margin-right: auto;

    border: 1px solid black;

    bottom: -300px;
  `;

  return (
    <SignupIdScreenContainer>
      <DescriptionContainer>
        <FirstDescription>회원가입을 시작할게요!</FirstDescription>
        <Description>사용할 닉네임을</Description>
        <Description>입력해주세요.</Description>
      </DescriptionContainer>

      <LoginContainer>
        <LoginLabel>닉네임</LoginLabel>
        <DuplicationAndTextInputContainer>
          <LoginText />
          <ActiveButton
            width="80px"
            height="48px"
            border_radius="8px"
            LabelInfo="중복확인"
            LabelSize="14px"
          />
        </DuplicationAndTextInputContainer>
      </LoginContainer>

      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="다음"
          LabelSize="17px"
          onPress={() => navigation.navigate('SignupPassword')}
        />
      </NextButtonContainer>
    </SignupIdScreenContainer>
  );
}

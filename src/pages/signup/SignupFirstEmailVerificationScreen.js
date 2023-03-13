import styled from 'styled-components/native';
import {Image, Platform, View} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import React from 'react';

export default function SignupFirstEmailVerificationScreen({navigation}) {
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
        <View style={{flexDirection: 'row', gap: 20, width: '100%'}}>
          <LoginText placeholder="이메일을 입력해주세요" />
          <ActiveButton
            width="23%"
            height="48px"
            border_radius="8px"
            LabelInfo="중복 확인"
            LabelSize="17px"
            onPress={() => {}}
          />
        </View>
      </LoginContainer>
      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="전송"
          LabelSize="17px"
          onPress={() => navigation.push('SignupEmailSecond')}
        />
      </NextButtonContainer>
    </SignupIdScreenContainer>
  );
}

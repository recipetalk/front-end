import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, Platform, View} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import FocusedTextInputBorder from '../../components/atoms/FocusedTextInputBorder';
import equals from '../../services/object/equals';
import {jsonAPI} from '../../services/connect/API';

export default function SignupIdScreen({navigation}) {
  const [id, setId] = useState('');
  const [isAccess, setAccess] = useState(false);
  const [accessId, setAccessId] = useState('');

  const getIsValidId = async () =>
    jsonAPI
      .get('/auth/signup/' + id)
      .then(response => {
        if (response.status === 200) {
          setAccess(true);
          setAccessId(id);
        } else {
          setAccess(false);
        }
      })
      .catch(err => {
        console.log(err);
      });

  return (
    <SignupIdScreenContainer>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>회원가입을 시작할게요!</FirstDescription>
        <Description>로그인 시 사용할</Description>
        <Description>아이디를 입력해주세요.</Description>
      </DescriptionContainer>

      <LoginContainer>
        <LoginLabel>아이디</LoginLabel>
        <DuplicationAndTextInputContainer>
          <View style={{width: '76%'}}>
            <FocusedTextInputBorder setData={setId} value={id} />
          </View>
          <ActiveButton
            width="80px"
            height="48px"
            border_radius="8px"
            LabelInfo="중복확인"
            LabelSize="14px"
            isActive={id.length >= 1}
            onPress={getIsValidId}
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
          onPress={() => navigation.push('SignupNickname')}
          isActive={isAccess && equals(id, accessId)}
        />
      </NextButtonContainer>
    </SignupIdScreenContainer>
  );
}

const Description = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: black;
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
        border: 1px solid green;
      `
    : styled.View`
        position: relative;
        height: 100%;
        border: 1px solid green;
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

const DuplicationAndTextInputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 5px;
`;

const NextButtonContainer = styled.View`
  position: relative;

  width: 90%;

  margin-left: auto;
  margin-right: auto;

  bottom: -300px;
`;

const TouchableContainer = styled.TouchableOpacity`
  width: 55px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

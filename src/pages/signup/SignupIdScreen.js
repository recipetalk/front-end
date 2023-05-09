import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Image, Platform, View} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import FocusedTextInputBorder from '../../components/atoms/FocusedTextInputBorder';
import equals from '../../services/object/equals';
import {jsonAPI} from '../../services/connect/API';
import AlertYesButton from '../../components/molecules/AlertYesButton';
import {useDispatch, useSelector} from 'react-redux';
import {setId} from '../../store/signup/Signup';

export default function SignupIdScreen({navigation}) {
  const idGlobal = useSelector(state => state.signUp.value.username);
  const dispatch = useDispatch();
  const [localId, setLocalId] = useState(idGlobal);
  const [isAccess, setAccess] = useState(false);
  const [accessId, setAccessId] = useState(null);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const textRef = useRef();

  const getIsValidId = async () =>
    jsonAPI
      .get('/auth/signup/' + localId)
      .then(response => {
        setAccess(true);
        setAccessId(localId);
        setVisibleAlert(true);
        textRef.current.blur();
      })
      .catch(err => {
        setAccess(false);
        setAccessId(null);
        setVisibleAlert(true);
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
            <FocusedTextInputBorder useRef={textRef} setData={setLocalId} value={localId} />
          </View>
          <ActiveButton
            width="80px"
            height="48px"
            border_radius="8px"
            LabelInfo={!equals(localId, accessId) ? '중복확인' : '확인완료'}
            LabelSize="14px"
            isActive={localId.length >= 1 && !equals(localId, accessId)}
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
          onPress={() => {
            dispatch(setId(localId));
            navigation.push('SignupNickname');
          }}
          isActive={isAccess && equals(localId, accessId)}
        />
      </NextButtonContainer>
      {visibleAlert && isAccess ? (
        <AlertYesButton
          title={'사용할 수 있는 아이디입니다 :)'}
          onPress={() => setVisibleAlert(false)}
        />
      ) : visibleAlert && !isAccess ? (
        <AlertYesButton
          title={'사용할 수 없는 아이디입니다 :('}
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

const SignupIdScreenContainer = styled.SafeAreaView`
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

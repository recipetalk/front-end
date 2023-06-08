import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Image, Platform, View} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import FocusedTextInputBorder from '../../components/atoms/FocusedTextInputBorder';
import equals from '../../services/object/equals';
import {jsonAPI} from '../../services/connect/API';
import AlertYesButton from '../../components/molecules/AlertYesButton';
import {useDispatch, useSelector} from 'react-redux';
import {setNickname} from '../../store/signup/Signup';
import {NicknameValidator} from '../../services/validator/NicknameValidator';

export default function SignupNicknameScreen({navigation}) {
  const globalNickname = useSelector(state => state.signUp.value.nickname);
  const dispatch = useDispatch();
  const [localNickname, setLocalNickname] = useState(globalNickname);
  const [isAccess, setAccess] = useState(false);
  const [accessNickname, setAccessNickname] = useState(null);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [isValidNickname, setValidNickname] = useState('');
  const textRef = useRef();

  const getIsValidNickname = async () => {
    textRef.current.blur();
    jsonAPI
      .get('/auth/signup/nickname/' + localNickname)
      .then(response => {
        setAccess(true);
        setAccessNickname(localNickname);
        setVisibleAlert(true);
      })
      .catch(err => {
        setAccess(false);
        setAccessNickname(null);
        setVisibleAlert(true);
      });
  };

  useEffect(() => {
    if (NicknameValidator(localNickname)) {
      setValidNickname('ok');
    } else {
      setValidNickname('no');
    }

    if (localNickname.length === 0) {
      setValidNickname('');
    }
  }, [localNickname]);

  return (
    <SignupIdScreenContainer>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>그다음 이에요!</FirstDescription>
        <Description>사용할 닉네임을</Description>
        <Description>입력해주세요.</Description>
      </DescriptionContainer>

      <LoginContainer>
        <LoginLabel>닉네임</LoginLabel>
        <DuplicationAndTextInputContainer>
          <View style={{width: '76%'}}>
            <FocusedTextInputBorder
              useRef={textRef}
              setData={setLocalNickname}
              value={localNickname}
              maxLength={10}
            />
            {isValidNickname === 'no' && (
              <ValidateLabel>
                닉네임은 3~10자리 한글, 영어, 숫자만 가능합니다
              </ValidateLabel>
            )}
          </View>
          <ActiveButton
            width="80px"
            height="48px"
            border_radius="8px"
            LabelInfo={
              !equals(localNickname, accessNickname) ? '중복확인' : '확인완료'
            }
            LabelSize="14px"
            isActive={isValidNickname && !equals(localNickname, accessNickname)}
            onPress={getIsValidNickname}
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
            dispatch(setNickname(localNickname));
            navigation.push('SignupPassword');
          }}
          isActive={isAccess && equals(localNickname, accessNickname)}
        />
      </NextButtonContainer>
      {visibleAlert && isAccess ? (
        <AlertYesButton
          title={'사용할 수 있는 닉네임입니다 :)'}
          onPress={() => setVisibleAlert(false)}
        />
      ) : visibleAlert && !isAccess ? (
        <AlertYesButton
          title={'사용할 수 없는 닉네임입니다 :('}
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
const ValidateLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #ff665c;
`;

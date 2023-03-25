import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Image, Platform, StyleSheet} from 'react-native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import CheckboxAndLabel from '../../components/molecules/CheckboxAndLabel';

const SignupStartScreen = ({navigation}) => {
  const [isAllChecked, setAllChecked] = useState(false);
  const [isFirstChecked, setFirstChecked] = useState(false);
  const [isSecondChecked, setSecondChecked] = useState(false);
  const [isThirdChecked, setThirdChecked] = useState(false);

  useEffect(() => {
    if (isAllChecked) {
      setFirstChecked(true);
      setSecondChecked(true);
      setThirdChecked(true);
    }
    if (isFirstChecked && isSecondChecked && isThirdChecked) {
      setAllChecked(true);
    }
  }, [isAllChecked]);

  useEffect(() => {
    if (isFirstChecked && isSecondChecked && isThirdChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [isFirstChecked, isSecondChecked, isThirdChecked]);

  return (
    <SignupIdScreenContainer>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../assets/images/Back.png')} />
      </TouchableContainer>
      <DescriptionContainer>
        <FirstDescription>회원가입 전에</FirstDescription>
        <Description>본격적인 시작전에</Description>
        <Description>약관동의부터 할께요!</Description>
      </DescriptionContainer>

      <CheckPart>
        <CheckItem>
          <CheckboxAndLabel
            value={isFirstChecked}
            setValue={setFirstChecked}
            label={'[필수] 레시피톡 이용약관 동의'}
            labelFontStyle={CheckboxLabelStyle.sub}
            checkboxSize={25}
          />
        </CheckItem>
        <CheckItem>
          <CheckboxAndLabel
            value={isSecondChecked}
            setValue={setSecondChecked}
            label={'[필수] 레시피톡 개인정보 수집 동의'}
            labelFontStyle={CheckboxLabelStyle.sub}
            checkboxSize={25}
          />
        </CheckItem>
        <CheckItem>
          <CheckboxAndLabel
            value={isThirdChecked}
            setValue={setThirdChecked}
            label={'[선택] 마케팅 활용 동의'}
            labelFontStyle={CheckboxLabelStyle.sub}
            checkboxSize={25}
          />
        </CheckItem>
      </CheckPart>
      <NextButtonContainer>
        <CheckItem>
          <CheckboxAndLabel
            value={isAllChecked}
            setValue={setAllChecked}
            label={'레시피톡 이용약관 전체 동의'}
            labelFontStyle={CheckboxLabelStyle.title}
            checkboxSize={25}
          />
        </CheckItem>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="다음"
          LabelSize="17px"
          onPress={() => navigation.push('SignupIdScreen')}
          isActive={isFirstChecked && isSecondChecked}
        />
      </NextButtonContainer>
    </SignupIdScreenContainer>
  );
};

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

const NextButtonContainer = styled.View`
  position: relative;

  width: 90%;

  margin-left: auto;
  margin-right: auto;
  gap: 10px;
  bottom: -270px;
`;

const TouchableContainer = styled.TouchableOpacity`
  width: 55px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

const CheckPart = styled.View`
  gap: 10px;
  width: 100%;
  margin-top: 30px;
`;

const CheckItem = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const CheckboxLabelStyle = StyleSheet.create({
  sub: {
    fontFamily: 'Pretendard Variable',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 18,
    color: '#333333',
  },
  title: {
    fontFamily: 'Pretendard Variable',
    fontWeight: 'normal',
    fontSize: 18,
    color: '#333333',
  },
});

export default SignupStartScreen;

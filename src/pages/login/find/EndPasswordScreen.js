import {useSelector} from 'react-redux';
import {Platform, View} from 'react-native';
import ActiveButton from '../../../components/atoms/board/ActiveButton';
import styled from 'styled-components/native';
import React from 'react';

export default function EndPasswordScreen({navigation}) {
  return (
    <SignupIdScreenContainer>
      <LogoImage
        source={require('../../../assets/images/OrangeLogo.png')}
        resizeMode="contain"
      />
      <DescriptionContainer>
        <SecondSlogan>비밀번호 변경이</SecondSlogan>
        <SecondSlogan style={{color: '#f09311'}}>완료되었어요!</SecondSlogan>

        <ThirdSlogan>매일의 요리가 새로워지는 레시피톡</ThirdSlogan>
      </DescriptionContainer>

      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="홈으로"
          LabelSize="17px"
          isActive={true}
          onPress={() =>
            navigation.reset({
              routes: [{name: 'LoginHome'}],
            })
          }
        />
      </NextButtonContainer>
    </SignupIdScreenContainer>
  );
}

const DescriptionContainer = styled.View`
  width: 90%;
  margin-left: 25px;
  margin-top: 15px;
  gap: 10px;
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

const NextButtonContainer = styled.View`
  position: relative;

  width: 90%;

  margin-top: 135px;
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

const SecondSlogan = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 41px;
  margin-top: -10px;
  font-family: 'Pretendard Variable';
  color: #666666;
`;

const ThirdSlogan = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
  margin-top: 15px;
  color: #666666;
`;

const LogoImage = styled.Image`
  width: 75px;
  height: 48px;
  margin-left: 16px;
  margin-top: 16px;
`;

import React from 'react';
import SloganText from '../components/atoms/title/recipetalkSlogan';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {Platform} from 'react-native';

export default function SimpleLoginScreen({navigation}) {
  return (
    <LoginScreenContainer>
      <ScrollView>
        <LogoImage
          source={require('../assets/images/OrangeLogo.png')}
          resizeMode="contain"
        />
        <SloganText />
        <SimpleLoginContainer onPress={() => navigation.navigate('LoginHome')}>
          <SimpleLoginLabel>아이디/비밀번호로 시작하기</SimpleLoginLabel>
        </SimpleLoginContainer>
      </ScrollView>
    </LoginScreenContainer>
  );
}

const LogoImage = styled.Image`
  width: 75px;
  height: 48px;
  margin-left: 16px;
  margin-top: 16px;
`;

const SimpleLoginContainer = styled.TouchableOpacity`
  width: 90%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 48px;
`;

const SimpleLoginLabel = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-decoration-line: underline;

  color: #666666;
`;

const LoginScreenContainer =
  Platform.OS === 'ios'
    ? styled.SafeAreaView`
        height: 100%;
      `
    : styled.View`
        height: 100%;
      `;

// const styles = StyleSheet.create({
//   test: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

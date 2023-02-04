import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUpScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>회원가입 페이지입니다.</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};
// title="회원가입" onPress={() => navigation.navigate('SignUp')}
export default SignUpScreen;

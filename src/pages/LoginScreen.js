import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>로그인 페이지입니다.</Text>
      <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
      <Button title="로그인" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   test: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
export default LoginScreen;

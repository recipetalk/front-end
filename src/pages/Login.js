import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

const Login = () => {
  const moveToPage = () => {
    console.log('ininin');
  };

  return (
    <SafeAreaView>
      <Text>로그인 페이지입니다.</Text>
      <Button onPress={moveToPage} title="페이지 이동(to 회원가입)" />
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
export default Login;

import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>홈 페이지입니다.</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
      <Button title="레시피" onPress={() => navigation.navigate('Recipe')} />
      <Button title="영수증" onPress={() => navigation.navigate('Receipt')} />
      <Button
        title="식재료"
        onPress={() => navigation.navigate('Ingredients')}
      />
      <Button
        title="마이페이지"
        onPress={() => navigation.navigate('Mypage')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

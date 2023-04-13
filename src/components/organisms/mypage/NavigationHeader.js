import React from 'react';
import styled from 'styled-components/native';
import {Image, Platform, View} from 'react-native';

export const NavigationHeader = ({navigation, title}) => {
  return (
    <Header>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          paddingLeft: 10,
        }}>
        <HeaderTouchButton onPress={() => navigation.pop()}>
          <Image
            source={require('../../../assets/images/Back.png')}
            resizeMode={'contain'}
          />
        </HeaderTouchButton>
        <HeaderLabel>{title}</HeaderLabel>
      </View>
    </Header>
  );
};
const HeaderTouchButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  background: #ffffff;
  width: 100%;
  height: 50px;

  justify-content: center;
`;

const HeaderLabel = styled.Text`
  color: #333333;
  ${() => (Platform.OS === 'ios' ? 'font-style: normal;' : undefined)}
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
`;

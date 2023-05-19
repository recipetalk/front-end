import React from 'react';
import styled from 'styled-components/native';
import {Image, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const MypageHeader = ({navigation}) => {
  const notificationState = useSelector(state => state.notificationState.value);
  return (
    <Header>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '5%',
          paddingRight: '5%',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <HeaderLabel>마이페이지</HeaderLabel>
        </View>
        <TouchableOpacity onPress={() => navigation.push('Notification')}>
          {notificationState.hasNew ? (
            <Image
              style={{width: 22}}
              source={require('../../../assets/images/Bell_Active_b.png')}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              style={{width: 22}}
              source={require('../../../assets/images/Bell_NonActive_b.png')}
              resizeMode={'contain'}
            />
          )}
        </TouchableOpacity>
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
  border-bottom-width: 1px;
  border-bottom-color: #f5f5f5;
  border-bottom-style: solid;
  justify-content: center;
`;

const HeaderLabel = styled.Text`
  color: #333333;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
`;

export default MypageHeader;

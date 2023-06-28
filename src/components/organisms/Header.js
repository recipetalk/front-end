import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = () => {
  const navigation = useNavigation();
  const notificationState = useSelector(state => state.notificationState.value);

  return (
    <CustomHeader>
      <View
        style={{
          paddingLeft: '5%',
          paddingRight: '5%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Logo
          source={require('../../assets/images/Logo.png')}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.push('Notification')}>
          {notificationState.hasNew ? (
            <Image
              style={{width: 22}}
              source={require('../../assets/images/Bell_Active_White.png')}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              style={{width: 22}}
              source={require('../../assets/images/Bell_NonActive_White.png')}
              resizeMode={'contain'}
            />
          )}
        </TouchableOpacity>
      </View>
    </CustomHeader>
  );
};

const CustomHeader = styled.SafeAreaView`
  width: 100%;
  height: 50px;
  background: #f09311;
`;

const Logo = styled.Image`
  width: 110px;
  height: 50px;
`;

export default Header;

import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const Header = () => {
  return (
    <CustomHeader>
      <View>
        <Logo
          source={require('../../assets/images/Logo.png')}
          resizeMode="contain"
        />
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
  margin-top: -35px;
  margin-left: 10px;
`;

export default Header;

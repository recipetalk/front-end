import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

const Header = () => {
  return <CustomHeader />;
};

const CustomHeader = styled(SafeAreaView)`
  width: 390px;
  height: 72px;

  background: #f09311;
`;

export default Header;

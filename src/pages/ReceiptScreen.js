import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

const ReceiptScreen = () => {
  return <ReciptScreenContainer />;
};

const ReciptScreenContainer =
  Platform.OS === 'ios' ? styled.SafeAreaView`` : styled.View``;

export default ReceiptScreen;

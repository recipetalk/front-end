import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, Text} from 'react-native';
import styled from 'styled-components/native';
import IngredientsHeader from '../components/organisms/Ingredients/IngredientsHeader';
import BarcodeScanner from '../components/templates/barcode/BarcodeScanner';
import {CameraScreen, CameraType} from 'react-native-camera-kit';

const ReceiptScreen = () => {
  return (
    <ReciptScreenContainer>
      <IngredientsHeader
        title="바코드 찍기"
        isTitleOnly={false}
        isTransparent={true}
        screen=""
      />
      <BarcodeScanner />
    </ReciptScreenContainer>
  );
};

const ReciptScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: black;
`;
const Btn = styled.TouchableOpacity``;
export default ReceiptScreen;

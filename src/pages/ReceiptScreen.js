import React from 'react';
import {Platform, Text} from 'react-native';
import styled from 'styled-components/native';
import IngredientsHeader from '../components/organisms/Ingredients/IngredientsHeader';

const ReceiptScreen = () => {
  return (
    <ReciptScreenContainer>
      <IngredientsHeader
        title="바코드 찍기"
        isTitleOnly={false}
        btnTextValue="앨범"
        isTransparent={true}
        screen=""
      />
      <Btn>
        <Text>이동</Text>
      </Btn>
    </ReciptScreenContainer>
  );
};

const ReciptScreenContainer =
  Platform.OS === 'ios' ? styled.SafeAreaView`` : styled.View``;

const Btn = styled.TouchableOpacity``;
export default ReceiptScreen;

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Dimensions, Image, Modal, Text, View} from 'react-native';
import DropDownPickerComponent from '../../components/molecules/DropDownPickerComponent';
import Checkbox from '@react-native-community/checkbox';
import {Calendar} from 'react-native-calendars';
import {useRoute} from '@react-navigation/native';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import {requestBarcodeRegist} from '../../services/Ingredients';
import AlertYesButton from '../../components/molecules/AlertYesButton';

export const RequestBarcodeScreen = ({navigation}) => {
  const router = useRoute();
  const [barcodeNumber, setBarcodeNumber] = useState(
    router.params.barcodeNumber,
  );
  const [productName, setProductName] = useState(null);
  const [isAlert, setAlert] = useState(false);

  const sendData = async () => {
    await requestBarcodeRegist(barcodeNumber, productName)
      .then(res => console.log('success', res))
      .catch(error => console.log(error.response));
    await setAlert(true);
  };

  return (
    <Container>
      <TouchableContainer onPress={() => navigation.pop()}>
        <Image source={require('../../assets/images/Back.png')} />
      </TouchableContainer>
      <RegisterIngredientsItemContainer>
        <IngredientName>상품 명</IngredientName>
        <IngredientNameContainer>
          <IngredientNameInput
            readOnly={false}
            editable={false}
            selectTextOnFocus={false}
            placeholder="예) 감자"
            placeholderTextColor="gray"
            value={productName}
            onChangeText={setProductName}
          />
        </IngredientNameContainer>
        <IngredientName>바코드 번호</IngredientName>
        <IngredientNameContainer>
          <IngredientNameInput
            readOnly={true}
            editable={true}
            selectTextOnFocus={false}
            placeholder="예) 감자"
            placeholderTextColor="gray"
            value={barcodeNumber}
          />
        </IngredientNameContainer>
      </RegisterIngredientsItemContainer>

      <NextButtonContainer>
        <ActiveButton
          width="100%"
          height="48px"
          border_radius="25px"
          LabelInfo="제출"
          LabelSize="17px"
          onPress={() => sendData()}
          isActive={productName?.length > 0}
        />
      </NextButtonContainer>
      {isAlert ? (
        <AlertYesButton
          title={'상품 등록해주셔서 감사합니다'}
          text={'빠른 시일 내에 검토하여 사용하실 수 있게 하겠습니다'}
          onPress={() => {
            setAlert(false);
            navigation.pop();
          }}
        />
      ) : undefined}
    </Container>
  );
};

const RegisterIngredientsItemContainer = styled.View`
  margin-top: 18px;
  padding-left: 5%;
  padding-right: 5%;
`;

const IngredientName = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
  font-family: 'Pretendard Variable';
`;

const IngredientNameContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const IngredientNameInput = styled.TextInput`
  background: ${props => (props.readOnly ? '#e9ebed' : '#ffffff')};
  width: 100%;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  font-family: 'Pretendard Variable';
  padding: 10px;
  color: #333333;
`;

const NextButtonContainer = styled.View`
  position: relative;

  width: 90%;

  margin-left: auto;
  margin-right: auto;
  gap: 10px;
  bottom: -270px;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const TouchableContainer = styled.TouchableOpacity`
  width: 55px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

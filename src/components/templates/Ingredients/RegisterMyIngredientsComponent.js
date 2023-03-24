import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Line from '../../atoms/Line';
import DirectlyRegisterIngredients from '../../organisms/Ingredients/DirectlyRegisterIngredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import RecentlyRegisteredIngredients from '../../organisms/Ingredients/RecentlyRegisteredIngredients';

const RegisterMyIngredientsComponent = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <RegisterMyIngredientsComponentContainer>
      <IngredientsHeader
        title="내 식재료 등록하기"
        isTitleOnly={true}
        btnTextValue=""
      />

      <ScannerContainer>
        <ScannerSection>
          <ScannerImage
            source={require('../../../assets/images/Barcode_Shooting_f09.png')}
          />
          <ScannerText>바코드 스캔하기</ScannerText>
        </ScannerSection>
      </ScannerContainer>

      <Line />

      <RegisterIngredientsDirectlyContainer>
        <RegisterIngredientsDirectlyText>
          재료 직접 추가
        </RegisterIngredientsDirectlyText>
        <TouchContainer onPress={() => setIsPressed(true)}>
          <RegisterIngredientsDirectlyImage
            source={require('../../../assets/images/Add_o.png')}
          />
        </TouchContainer>
      </RegisterIngredientsDirectlyContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isPressed ? (
          <DirectlyRegisterIngredients />
        ) : (
          <RecentlyRegisteredIngredients items={[]} />
        )}
      </ScrollView>
    </RegisterMyIngredientsComponentContainer>
  );
};

const RegisterMyIngredientsComponentContainer = styled.View`
  margin-bottom: 600px;
`;

const ScannerContainer = styled.View`
  width: 100%;
  height: 170px;
  background-color: #ffffff;
`;

const ScannerSection = styled.View`
  width: 250px;
  height: 135px;

  background: #fff4e5;

  border: 1px solid #f09311;
  border-radius: 5px;
  margin: auto;
  justify-content: center;
`;

const ScannerText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #f09311;
  text-align: center;
`;

const ScannerImage = styled.Image`
  width: 40px;
  height: 40px;
  margin: 0 auto 10px auto;
`;

const RegisterIngredientsDirectlyContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: #ffffff;
`;

const RegisterIngredientsDirectlyText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const RegisterIngredientsDirectlyImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const TouchContainer = styled.TouchableOpacity``;
export default RegisterMyIngredientsComponent;

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import Line from '../../atoms/Line';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';

const IngredientsAddComponent = () => {
  const navigation = useNavigation();

  return (
    <IngredientsAddComponentContainer>
      <IngredientsHeader
        title="내 식재료 등록하기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <ScannerContainer>
        <ScanSection />
      </ScannerContainer>
      <Line />
      <AddIngredients>
        <AddIngredientsText>재료 직접 추가</AddIngredientsText>
        <TouchContainer>
          <AddImage source={require('../../../assets/images/Add_o.png')} />
        </TouchContainer>
      </AddIngredients>
      <RecentIngredients>
        <RecentIngredientsText>최근 등록된 식재료</RecentIngredientsText>
        <TouchContainer onPress={() => navigation.navigate('Ingredients')}>
          <TotalContainer>
            <TotalImg source={require('../../../assets/images/Add_o.png')} />
            <TotalText>전체보기</TotalText>
          </TotalContainer>
        </TouchContainer>
      </RecentIngredients>
    </IngredientsAddComponentContainer>
  );
};

const IngredientsAddComponentContainer = styled.View``;
const ScannerContainer = styled.View`
  width: 100%;
  height: 170px;
  background-color: #ffffff;
`;

const ScanSection = styled.View`
  width: 250px;
  height: 135px;

  background: #fff4e5;

  border: 1px solid #f09311;
  border-radius: 5px;
  margin: auto;
`;

const AddIngredients = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: #ffffff;
`;

const AddIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #f09311;
`;

const TouchContainer = styled.TouchableOpacity``;
const AddImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const RecentIngredients = styled.View`
  padding: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const RecentIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  color: #333333;
`;

const TotalContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const TotalImg = styled.Image`
  width: 15px;
  height: 15px;
`;

const TotalText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: #f09311;
`;
export default IngredientsAddComponent;

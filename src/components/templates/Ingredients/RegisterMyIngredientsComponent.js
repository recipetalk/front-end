import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {registerIngredient} from '../../../services/Ingredients';
import {addEmptyIngredients} from '../../../store/Ingredients/IngredientsSlice';
import Line from '../../atoms/Line';
import DirectlyRegisterIngredients from '../../organisms/Ingredients/DirectlyRegisterIngredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';

const RegisterMyIngredientsComponent = () => {
  const dispatch = useDispatch();
  const ingredientsList = useSelector(state => state.ingredients);
  const navigation = useNavigation();

  const addDirectly = () => {
    dispatch(addEmptyIngredients());
  };

  const checkIsChecked = () => {
    return ingredientsList.filter(item => item.isChecked === true).length;
  };

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
        <TouchContainer onPress={addDirectly}>
          <RegisterIngredientsDirectlyImage
            source={require('../../../assets/images/Add_o.png')}
          />
        </TouchContainer>
      </RegisterIngredientsDirectlyContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <DirectlyRegisterIngredientsContainer>
          <DirectlyRegisterIngredientsText>
            식재료 등록하기
          </DirectlyRegisterIngredientsText>

          {ingredientsList.map((item, index) => {
            return <DirectlyRegisterIngredients key={index} item={item} />;
          })}

          <TouchContainer
            onPress={() => {
              if (checkIsChecked() === 0) {
                return;
              }
              registerIngredient()
                .then(res => console.log(res.data))
                .catch(error => console.error(error.response));
              navigation.goBack();
            }}>
            <IngredientRegisterButton
              active={checkIsChecked() > 0 ? true : false}>
              <IngredientRegisterButtonText>
                {`총 ${checkIsChecked()}개의 식재료 등록하기`}
              </IngredientRegisterButtonText>
            </IngredientRegisterButton>
          </TouchContainer>
        </DirectlyRegisterIngredientsContainer>
      </ScrollView>
    </RegisterMyIngredientsComponentContainer>
  );
};

const DirectlyRegisterIngredientsContainer = styled.View`
  padding: 18px;
`;

const DirectlyRegisterIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
  font-family: 'Pretendard Variable';
`;

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

const IngredientRegisterButton = styled.View`
  background: ${props => (props.active ? '#f09311' : '#e1e1e1')}
  border-radius: 8px;
  height: 48px;
  justify-content: center;
`;

const IngredientRegisterButtonText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #ffffff;
`;

const TouchContainer = styled.TouchableOpacity``;
export default RegisterMyIngredientsComponent;

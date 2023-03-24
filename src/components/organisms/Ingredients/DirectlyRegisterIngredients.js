import React, {useState} from 'react';
import styled from 'styled-components/native';
import Checkbox from '@react-native-community/checkbox';

const DirectlyRegisterIngredients = () => {
  const [isAddChecked, setIsAddChecked] = useState(false);

  return (
    <DirectlyRegisterIngredientsContainer>
      <DirectlyRegisterIngredientsText>
        식재료 등록하기
      </DirectlyRegisterIngredientsText>
      <RegisterIngredientsItemContainer>
        <CheckBoxViewContainer>
          <CheckBoxView>
            <RegisterIngredientsCheckbox
              value={isAddChecked}
              onValueChange={setIsAddChecked}
              onFillColor="#F09311"
              tintColors={{true: '#F09311', false: '#A4A4A4'}}
              boxType="square"
              tintColor="#A4A4A4"
              onCheckColor="#FFFFFF"
              onTintColor="#F09311"
            />
            <RegisterIngredientsText>이 식재료 추가</RegisterIngredientsText>
          </CheckBoxView>

          <TouchContainer>
            <DeleteIngredientsText>재료 삭제</DeleteIngredientsText>
          </TouchContainer>
        </CheckBoxViewContainer>

        <IngredientName>식재료 명</IngredientName>
        <IngredientNameContainer>
          <IngredientNameInput placeholder="  예) 감자  " />
        </IngredientNameContainer>

        <IngredientStatusContainer>
          <IngredientStatusText>상태 입력</IngredientStatusText>
          <IngredientStatusInput placeholder="  예) 1개 " />
        </IngredientStatusContainer>

        <IngredientStatusContainer>
          <IngredientStatusText>유통 기한</IngredientStatusText>
          <IngredientStatusInput placeholder="  예) 1개 " />
        </IngredientStatusContainer>

        <IngredientStatusContainer>
          <IngredientStatusText>수량 입력</IngredientStatusText>
          <IngredientStatusInput placeholder="  예) 1개 " />
        </IngredientStatusContainer>

        <TouchContainer>
          <IngredientRegisterButton>
            <IngredientRegisterButtonText>
              총 1개의 식재료 등록하기
            </IngredientRegisterButtonText>
          </IngredientRegisterButton>
        </TouchContainer>
      </RegisterIngredientsItemContainer>
    </DirectlyRegisterIngredientsContainer>
  );
};

const RegisterIngredientsItemContainer = styled.View`
  margin-top: 18px;
`;

const CheckBoxViewContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const CheckBoxView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const RegisterIngredientsCheckbox = styled(Checkbox)`
  width: 22px;
  height: 22px;
`;

const RegisterIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const DeleteIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';

  color: #a0a0a0;
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
  flex-direction: row;
  margin-bottom: 18px;
`;

const IngredientNameInput = styled.TextInput`
  background: #ffffff;
  width: 100%;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  font-family: 'Pretendard Variable';
`;

const IngredientStatusContainer = styled.View`
  height: 80px;
  display: flex;
  flex-direction: row;
`;

const IngredientStatusInput = styled.TextInput`
  background: #ffffff;
  width: 260px;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  font-family: 'Pretendard Variable';
`;

const IngredientStatusText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
  color: #333333;
  margin-right: 25px;
`;

const IngredientRegisterButton = styled.View`
  background: #f09311;
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

const TouchContainer = styled.TouchableOpacity``;
export default DirectlyRegisterIngredients;

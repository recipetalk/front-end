import React, {useState} from 'react';
import styled from 'styled-components/native';
import Checkbox from '@react-native-community/checkbox';
import {addIngredients} from '../../../store/Ingredients/IngredientsSlice';
import {useDispatch} from 'react-redux';

const DirectlyRegisterIngredients = props => {
  const dispatch = useDispatch();
  const [isAddChecked, setIsAddChecked] = useState(false);

  const [ingredientsInfo, setIngredientsInfo] = useState({
    name: '',
    status: '',
    expirationDate: '',
    amount: '',
  });

  const addThisIngredients = newValue => {
    setIsAddChecked(newValue);

    if (newValue) {
      dispatch(
        addIngredients({
          id: props.item.id,
          name: ingredientsInfo.name,
          status: ingredientsInfo.status,
          expirationDate: ingredientsInfo.expirationDate,
          amount: ingredientsInfo.amount,
          isChecked: true,
        }),
      );
    }
  };

  const deleteIngredients = () => {
    console.log('ininini');
    dispatch();
  };

  return (
    <RegisterIngredientsItemContainer>
      <CheckBoxViewContainer>
        <CheckBoxView>
          <RegisterIngredientsCheckbox
            value={isAddChecked}
            onFillColor="#F09311"
            onValueChange={addThisIngredients}
            tintColors={{true: '#F09311', false: '#A4A4A4'}}
            boxType="square"
            tintColor="#A4A4A4"
            onCheckColor="#FFFFFF"
            onTintColor="#F09311"
          />
          <RegisterIngredientsText>이 식재료 추가</RegisterIngredientsText>
        </CheckBoxView>

        <TouchContainer onPress={deleteIngredients}>
          <DeleteIngredientsText>재료 삭제</DeleteIngredientsText>
        </TouchContainer>
      </CheckBoxViewContainer>

      <IngredientName>식재료 명</IngredientName>
      <IngredientNameContainer>
        <IngredientNameInput
          placeholder="  예) 감자  "
          value={ingredientsInfo.name}
          onChangeText={res =>
            setIngredientsInfo({...ingredientsInfo, name: res})
          }
        />
      </IngredientNameContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>상태 입력</IngredientStatusText>
        <IngredientStatusInput
          placeholder="  예) 1개 "
          value={ingredientsInfo.status}
          onChangeText={res =>
            setIngredientsInfo({...ingredientsInfo, status: res})
          }
        />
      </IngredientStatusContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>유통 기한</IngredientStatusText>
        <IngredientStatusInput
          placeholder="  예) 1개 "
          value={ingredientsInfo.expirationDate}
          onChangeText={res =>
            setIngredientsInfo({...ingredientsInfo, expirationDate: res})
          }
        />
      </IngredientStatusContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>수량 입력</IngredientStatusText>
        <IngredientStatusInput
          placeholder="  예) 1개 "
          value={ingredientsInfo.amount}
          onChangeText={res =>
            setIngredientsInfo({...ingredientsInfo, amount: res})
          }
        />
      </IngredientStatusContainer>
    </RegisterIngredientsItemContainer>
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

const TouchContainer = styled.TouchableOpacity``;
export default DirectlyRegisterIngredients;

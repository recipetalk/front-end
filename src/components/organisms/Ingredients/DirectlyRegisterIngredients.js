import React, {useState} from 'react';
import styled from 'styled-components/native';
import Checkbox from '@react-native-community/checkbox';
import {
  addIngredients,
  deleteIngredients,
} from '../../../store/Ingredients/IngredientsSlice';
import {useDispatch} from 'react-redux';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import {FlatList, View} from 'react-native';
import {getSearchIngredient} from '../../../services/Ingredients';
import {Text} from 'react-native';

const DirectlyRegisterIngredients = props => {
  const dispatch = useDispatch();
  const [isAddChecked, setIsAddChecked] = useState(props.item.isChecked);
  const [isResultLength, setIsResultLength] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [ingredientsStatusInfo, setIngredientsStatusInfo] = useState(
    props.item.ingredientState,
  );

  const [ingredientsInfo, setIngredientsInfo] = useState({
    ingredientName: props.item.name,
    expirationDate: props.item.expirationDate,
    quantity: props.item.amount,
  });

  const statusPlaceholder = [
    {placeholder: '상태', label: '생것', value: '생것'},
    {placeholder: '상태', label: '익힌것', value: '익힌것'},
  ];

  const addThisIngredients = newValue => {
    setIsAddChecked(newValue);

    if (newValue) {
      dispatch(
        addIngredients({
          ingredientId: props.item.ingredientId,
          ingredientName: ingredientsInfo.ingredientName,
          ingredientState: ingredientsStatusInfo,
          expirationDate: ingredientsInfo.expirationDate,
          quantity: ingredientsInfo.quantity,
          isChecked: true,
        }),
      );
    } else {
      dispatch(
        addIngredients({
          ingredientId: props.item.ingredientId,
          ingredientName: ingredientsInfo.ingredientName,
          ingredientState: ingredientsStatusInfo,
          expirationDate: ingredientsInfo.expirationDate,
          quantity: ingredientsInfo.quantity,
          isChecked: false,
        }),
      );
    }
  };

  const deleteThisIngredients = () => {
    dispatch(deleteIngredients(props.item.ingredientId));
  };

  const changeText = res => {
    if (res.length === 0) {
      setIsResultLength(0);
    } else {
      setIsResultLength(res.length);
    }

    setIngredientsInfo({...ingredientsInfo, name: res});
    getSearchIngredient(res).then(result => setSearchResult(result.data));
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          zIndex: 9999,
        }}>
        <TouchContainer
          onPress={() =>
            setIngredientsInfo({...ingredientsInfo, name: item.ingredientName})
          }>
          <Text>{item.ingredientName}</Text>
        </TouchContainer>
      </View>
    );
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

        <TouchContainer onPress={deleteThisIngredients}>
          <DeleteIngredientsText>재료 삭제</DeleteIngredientsText>
        </TouchContainer>
      </CheckBoxViewContainer>

      <IngredientName>식재료 명</IngredientName>
      <IngredientNameContainer>
        <IngredientNameInput
          placeholder="  예) 감자  "
          value={ingredientsInfo.name}
          onChangeText={changeText}
        />
        {isResultLength === 0 ? null : (
          <FlatList
            data={searchResult}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </IngredientNameContainer>

      <IngredientStatusDropBoxContainer>
        <IngredientStatusText>상태 입력</IngredientStatusText>
        <View>
          <DropDownPickerComponent
            width="260px"
            items={statusPlaceholder}
            value={ingredientsStatusInfo}
            placeholder=" 예) 생 것"
            setValue={setIngredientsStatusInfo}
          />
        </View>
      </IngredientStatusDropBoxContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>소비 기한</IngredientStatusText>
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
  flex-direction: column;
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
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const IngredientStatusDropBoxContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  z-index: 2;
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

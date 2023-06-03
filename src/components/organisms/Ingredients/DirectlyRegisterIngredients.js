import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Checkbox from '@react-native-community/checkbox';
import {
  addIngredients,
  deleteIngredients,
} from '../../../store/Ingredients/IngredientsSlice';
import {useDispatch} from 'react-redux';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import {Dimensions, Modal, View} from 'react-native';
import {getSearchIngredient} from '../../../services/Ingredients';
import {Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

const DirectlyRegisterIngredients = ({item, readOnly}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isAddChecked, setIsAddChecked] = useState(item.isChecked);
  const [isResultLength, setIsResultLength] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [ingredientsStatusInfo, setIngredientsStatusInfo] = useState(
    item.ingredientState,
  );

  const [ingredientsInfo, setIngredientsInfo] = useState({
    ingredientName: item.ingredientName,
    expirationDate: item.expirationDate,
    quantity: item.quantity,
  });

  const statusPlaceholder = [
    {placeholder: '상태', label: '냉동', value: '냉동'},
    {placeholder: '상태', label: '냉장', value: '냉장'},
    {placeholder: '상태', label: '실온', value: '실온'},
  ];

  const addThisIngredients = newValue => {
    setIsAddChecked(newValue);

    if (newValue) {
      dispatch(
        addIngredients({
          ingredientId: item.ingredientId,
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
          ingredientId: item.ingredientId,
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
    dispatch(deleteIngredients(item.ingredientId));
  };

  const changeText = res => {
    if (res.length === 0) {
      setIsResultLength(0);
    } else {
      setIsResultLength(res.length);
    }

    setIngredientsInfo({...ingredientsInfo, ingredientName: res});
  };

  useEffect(() => {
    let id = setTimeout(() => {
      console.log(ingredientsInfo.ingredientName);
      getSearchIngredient(ingredientsInfo.ingredientName).then(result =>
        setSearchResult(result.data),
      );
    }, 600);

    return () => clearTimeout(id);
  }, [ingredientsInfo.ingredientName]);

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
          readOnly={readOnly}
          editable={readOnly}
          selectTextOnFocus={readOnly}
          placeholder="예) 감자"
          placeholderTextColor="gray"
          value={ingredientsInfo.ingredientName}
          onChangeText={changeText}
        />
      </IngredientNameContainer>

      <IngredientStatusDropBoxContainer>
        <IngredientStatusText>상태 입력</IngredientStatusText>
        <View>
          <DropDownPickerComponent
            width="260px"
            items={statusPlaceholder}
            value={ingredientsStatusInfo}
            placeholder="예) 냉동"
            setValue={setIngredientsStatusInfo}
          />
        </View>
      </IngredientStatusDropBoxContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>소비 기한</IngredientStatusText>
        <TouchContainer onPress={() => setIsOpenCalendar(prev => !prev)}>
          <ExpirationDateView>
            {selected.length === 0 ? (
              <Text style={{color: 'gray'}}>{'예) 2023-11-11'}</Text>
            ) : (
              <Text style={{color: 'black'}}>{selected}</Text>
            )}
          </ExpirationDateView>
        </TouchContainer>
      </IngredientStatusContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>수량 입력</IngredientStatusText>
        <IngredientStatusInput
          placeholder="예) 1개"
          placeholderTextColor="gray"
          value={ingredientsInfo.quantity}
          onChangeText={res =>
            setIngredientsInfo({...ingredientsInfo, quantity: res})
          }
        />
      </IngredientStatusContainer>
      {isOpenCalendar ? (
        <Modal transparent={true}>
          <CustomModal>
            <CustomCalendar
              onDayPress={day => {
                setIsOpenCalendar(false);
                setSelected(day.dateString);
                setIngredientsInfo({
                  ...ingredientsInfo,
                  expirationDate: day.dateString,
                });
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
            />
          </CustomModal>
        </Modal>
      ) : null}
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
  background: ${props => (props.readOnly ? 'gray' : '#ffffff')};
  width: 100%;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  font-family: 'Pretendard Variable';
  padding: 10px;
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
  padding: 10px;
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

const ExpirationDateView = styled.View`
  background: #ffffff;
  width: 260px;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  font-family: 'Pretendard Variable';
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const CustomModal = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
`;

const CustomCalendar = styled(Calendar)`
  width: 350px;
  margin: 0 auto;
  top: ${Dimensions.get('window').height / 3.5}px;
`;

export default DirectlyRegisterIngredients;

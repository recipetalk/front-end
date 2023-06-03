import React, {useState} from 'react';
import styled from 'styled-components/native';
import Checkbox from '@react-native-community/checkbox';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import {Dimensions, Modal, View} from 'react-native';
import {Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

const DirectlyEditIngredients = props => {
  const [selected, setSelected] = useState('');
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const statusPlaceholder = [
    {placeholder: '상태', label: '냉동', value: '냉동'},
    {placeholder: '상태', label: '냉장', value: '냉장'},
    {placeholder: '상태', label: '실온', value: '실온'},
  ];

  return (
    <RegisterIngredientsItemContainer>
      <IngredientName>식재료 명</IngredientName>
      <IngredientNameContainer>
        <IngredientNameInput
          readOnly={props.readOnly}
          editable={props.readOnly}
          selectTextOnFocus={props.readOnly}
          placeholder="예) 감자"
          placeholderTextColor="gray"
          value={props.item.ingredientName}
        />
      </IngredientNameContainer>

      <IngredientStatusDropBoxContainer>
        <IngredientStatusText>상태 입력</IngredientStatusText>
        <View>
          <DropDownPickerComponent
            width="260px"
            items={statusPlaceholder}
            value={props.ingredientsStatusInfo}
            placeholder="예) 냉동"
            setValue={props.setIngredientsStatusInfo}
          />
        </View>
      </IngredientStatusDropBoxContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>소비 기한</IngredientStatusText>
        <TouchContainer onPress={() => setIsOpenCalendar(prev => !prev)}>
          <ExpirationDateView>
            {props.ingredientsInfo.expirationDate.length === 0 ? (
              <Text style={{color: 'gray'}}>{'예) 2023-11-11'}</Text>
            ) : (
              <Text style={{color: 'black'}}>
                {props.ingredientsInfo.expirationDate}
              </Text>
            )}
          </ExpirationDateView>
        </TouchContainer>
      </IngredientStatusContainer>

      <IngredientStatusContainer>
        <IngredientStatusText>수량 입력</IngredientStatusText>
        <IngredientStatusInput
          placeholder="예) 1개"
          placeholderTextColor="gray"
          value={props.ingredientsInfo.quantity}
          onChangeText={res =>
            props.setIngredientsInfo({...props.ingredientsInfo, quantity: res})
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
                props.setIngredientsInfo({
                  ...props.ingredientsInfo,
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

export default DirectlyEditIngredients;

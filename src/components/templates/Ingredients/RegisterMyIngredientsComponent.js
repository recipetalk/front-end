import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {getBarcode, registerIngredient} from '../../../services/Ingredients';
import {addEmptyIngredients} from '../../../store/Ingredients/IngredientsSlice';
import DirectlyRegisterIngredients from '../../organisms/Ingredients/DirectlyRegisterIngredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import {IngredientSelectorComponent} from './IngredientSelectorComponent';

const RegisterMyIngredientsComponent = () => {
  const router = useRoute();
  const dispatch = useDispatch();
  const ingredientsList = useSelector(state => state.ingredients);
  const navigation = useNavigation();
  const [isFocus, setFocus] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [sendText, setSendText] = useState(null);
  const [checkedItem, setCheckedItem] = useState('');

  useEffect(() => {
    if (router.params !== undefined) {
      getBarcode(router.params.barcodeNumber)
        .then(res => console.log(res))
        .catch(error => console.error(error.response));
    }
  }, [router.params]);

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
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DirectlyRegisterIngredientsContainer>
            <DirectlyRegisterIngredientsText>
              식재료 등록하기
            </DirectlyRegisterIngredientsText>

            {ingredientsList.map((item, index) => {
              return (
                <DirectlyRegisterIngredients
                  key={index}
                  item={item}
                  isFocus={isFocus}
                  checkedItem={checkedItem}
                  setFocus={setFocus}
                  setSendText={setSendText}
                  setSelectIndex={setSelectIndex}
                  readOnly={false}
                />
              );
            })}

            <TouchContainer
              onPress={() => {
                if (checkIsChecked() === 0) {
                  return;
                }

                let newArr = [];
                ingredientsList.map(item => {
                  newArr.push({
                    expirationDate: item.expirationDate,
                    ingredientId: item.ingredientId,
                    ingredientName: item.ingredientName,
                    ingredientState: item.ingredientState,
                    quantity: item.quantity,
                  });
                });

                console.log(
                  'RegisterMyIngredientsComponent newArr is : ',
                  newArr,
                );

                registerIngredient(newArr)
                  .then(res =>
                    console.log('RegisterMyIngredientsComponent res is :', res),
                  )
                  .catch(error =>
                    console.error(
                      'RegisterMyIngredientsComponent error is ',
                      error.response,
                    ),
                  );
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
        {isFocus ? (
          <CustomInputView>
            <IngredientSelectorComponent
              isFocus={isFocus}
              setCheckedItem={setCheckedItem}
              targetIngredientName={sendText}
              index={selectIndex}
            />
          </CustomInputView>
        ) : undefined}
      </KeyboardAvoidingView>

      <BarcodeRegisterBtn onPress={() => navigation.navigate('Receipt')}>
        <CustomImage source={require('../../../assets/images/Receipt.png')} />
      </BarcodeRegisterBtn>
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
  height: 100%;
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

const BarcodeRegisterBtn = styled.TouchableOpacity`
  position: absolute;
  width: 55px;
  height: 55px;
  background: #333333;
  border-radius: 100px;
  right: 20px;
  bottom: 20px;

  align-items: center;
  justify-content: center;
`;

const CustomImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const CustomInputView = styled.View`
  margin-bottom: 47px;
`;
export default RegisterMyIngredientsComponent;

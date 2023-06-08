import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {getBarcode, registerIngredient} from '../../../services/Ingredients';
import {
  addEmptyIngredients,
  addIngredients,
  addNewBarcodeInfo,
  resetIngredients,
} from '../../../store/Ingredients/IngredientsSlice';
import DirectlyRegisterIngredients from '../../organisms/Ingredients/DirectlyRegisterIngredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import {IngredientSelectorComponent} from './IngredientSelectorComponent';
import AlertYesNoButton from '../../molecules/AlertYesNoButton';
import AlertTwoChooseButton from '../../molecules/AlertTwoChooseButton';
import AlertYesButton from '../../molecules/AlertYesButton';
import {useToast} from 'react-native-toast-notifications';

const RegisterMyIngredientsComponent = () => {
  const router = useRoute();
  const dispatch = useDispatch();
  const ingredientsList = useSelector(state => state.ingredients);
  const navigation = useNavigation();
  const toast = useToast();
  const [isFocus, setFocus] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [sendText, setSendText] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');
  const [barcode, setBarcode] = useState(null);
  const [isAlert, setAlert] = useState(false);
  const [isExceptionAlert, setExceptionAlert] = useState(false);
  const [isWarnAlert, setWarnAlert] = useState(false);
  const [isScroll, setScroll] = useState(false);
  useLayoutEffect(() => {
    if (router.params?.barcodeNumber !== undefined) {
      // console.log(barcodeSlice);
      getBarcode(router.params.barcodeNumber)
        .then(res => {
          const data = JSON.parse(res.request._response);
          console.log(data);
          setAlertTitle(() => '바코드 인식 결과');
          setAlertText(() => `${data.productName}가 맞나요?`);
          setBarcode({...data, barcodeNumber: router.params.barcodeNumber});
          setAlert(() => true);
        })
        .catch(error => {
          console.log('error', error);
          const {
            response: {status},
          } = error;
          if (status === 404) {
            setExceptionAlert(true);
          } else {
            toast.show(
              '네트워크가 좋지 않습니다. 나중에 다시 한번 시도해주세요',
            );
          }
        }); // 404가 오면 여기로
    }
  }, [router.params]);

  const addDirectly = () => {
    dispatch(addEmptyIngredients());
  };

  const checkIsChecked = () => {
    return ingredientsList.filter(item => item.isChecked === true).length;
  };

  const barcodeSaveAction = () => {
    setAlert(false);
    if (barcode.isClosed || barcode.isProductShutdown) {
      setWarnAlert(true);
    }

    dispatch(
      addNewBarcodeInfo({
        ingredientId: barcode.ingredientId,
        productName: barcode.productName,
      }),
    );
  };
  const barcodeNoneAction = () => {
    setExceptionAlert(false);
    navigation.push('RequestBarcode', {
      barcodeNumber: router.params.barcodeNumber,
    });
  };

  return (
    <>
      <IngredientsHeader
        title="내 식재료 등록하기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1, backgroundColor: 'white'}}>
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

        <ScrollView
          onMomentumScrollEnd={() => setScroll(false)}
          onMomentumScrollBegin={() => setScroll(true)}
          onScrollBeginDrag={() => setScroll(true)}
          showsVerticalScrollIndicator={false}
          style={{width: '100%', height: '100%'}}>
          <DirectlyRegisterIngredientsContainer>
            <DirectlyRegisterIngredientsText>
              식재료 등록하기
            </DirectlyRegisterIngredientsText>

            <FlatList
              data={ingredientsList}
              inverted={true}
              scrollEnabled={false}
              renderItem={({item}) => (
                <DirectlyRegisterIngredients
                  id={item.id}
                  ingredientState={item.ingredientState}
                  quantity={item.quantity}
                  ingredientName={item.ingredientName}
                  isChecked={item.isChecked}
                  isFocus={isFocus}
                  setFocus={setFocus}
                  setSendText={setSendText}
                  setSelectIndex={setSelectIndex}
                  readOnly={!item.isEditable}
                />
              )}
            />
          </DirectlyRegisterIngredientsContainer>
        </ScrollView>
        {isFocus ? (
          <IngredientSelectorComponent
            isFocus={isFocus}
            targetIngredientName={sendText}
            index={selectIndex}
          />
        ) : undefined}
      </KeyboardAvoidingView>

      <BarcodeRegisterBtn onPress={() => navigation.navigate('Receipt')}>
        <CustomImage source={require('../../../assets/images/Receipt.png')} />
      </BarcodeRegisterBtn>
      {!isScroll ? (
        <TouchContainer
          onPress={() => {
            if (checkIsChecked() === 0) {
              return;
            }

            let newArr = [];

            ingredientsList
              .filter(item => item.isChecked === true)
              .map(item => {
                newArr.push({
                  expirationDate: item.expirationDate,
                  ingredientId: item.ingredientId,
                  ingredientName: item.ingredientName,
                  ingredientState: item.ingredientState,
                  quantity: item.quantity,
                });
              });

            console.log('RegisterMyIngredientsComponent newArr is : ', newArr);

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
            navigation.pop();
          }}
          style={{position: 'absolute', bottom: 80, left: 50}}>
          <IngredientRegisterButton active={checkIsChecked() > 0}>
            <IngredientRegisterButtonText>
              {`총 ${checkIsChecked()}개의 식재료 등록하기`}
            </IngredientRegisterButtonText>
          </IngredientRegisterButton>
        </TouchContainer>
      ) : undefined}
      {isAlert ? (
        <AlertTwoChooseButton
          setAlert={setAlert}
          text={alertText}
          title={alertTitle}
          secondButtonText={'네'}
          firstButtonText={'안맞아요'}
          secondPress={() => barcodeSaveAction()}
          firstPress={() => {
            setAlert(false);
            setExceptionAlert(true);
          }}
        />
      ) : undefined}
      {isWarnAlert ? (
        <AlertYesButton
          title={'경고!'}
          text={
            '해당 제품은 더이상 판매되지 않는 제품입니다. 취급에 주의해주세요!'
          }
          onPress={() => setWarnAlert(false)}
        />
      ) : undefined}
      {isExceptionAlert ? (
        <AlertYesNoButton
          title={'바코드 인식 결과'}
          text={`저희한테 바코드가 없어요...
다른 사용자가 편할 수 있게
추가해주실 수 있나요?!`}
          setAlert={setExceptionAlert}
          yesButtonText={'네!'}
          onPress={() => barcodeNoneAction()}
        />
      ) : undefined}
    </>
  );
};

const DirectlyRegisterIngredientsContainer = styled.View`
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 20px;
`;

const DirectlyRegisterIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const RegisterIngredientsDirectlyContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  height: 60px;
  align-items: center;
  background-color: #ffffff;
  border-bottom-width: 4px;
  border-bottom-color: #e5e5e5;
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
  width: 200px;
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
  bottom: 80px;

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

import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IngredientSelectorComponent} from '../../components/templates/Ingredients/IngredientSelectorComponent';
import {useDispatch, useSelector} from 'react-redux';
import {initSaveIngredientToTarget} from '../../store/Ingredients/SelectedByFindIngredientSlice';
import {
  setRecipeIngredients,
  updateRecipeIngredientWithIndex,
} from '../../store/RecipeEdit/TempRecipeEditInfoSlice';

const RecipeEditSecondScreen = ({navigation}) => {
  const [isFocus, setFocus] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [sendText, setSendText] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const dispatch = useDispatch();
  const getText = useSelector(state => state.findIngredientsSelector);
  const loadRecipeIngredients = useSelector(
    state => state.editRecipeInfo,
  ).recipeIngredients;

  const onChangeText = (index, property) => e => {
    let data = {index: index, property: property, text: e.nativeEvent.text};
    dispatch(updateRecipeIngredientWithIndex(data));

    //텍스트 박스에 포커스가 잡혀있으면?
    if (isFocus) {
      //IngredientSelectorComponent로 데이터 전송
      setSendText(e.nativeEvent.text);
    }
  };

  useEffect(() => {
    setEnabled(() => true);
    if (loadRecipeIngredients.length === 0) {
      setEnabled(false);
      return;
    }
    loadRecipeIngredients.forEach(data =>
      setEnabled(
        enabled =>
          enabled &&
          data.ingredientName !== null &&
          data.ingredientName.trim() !== '' &&
          data.quantity !== null &&
          data.quantity.trim() !== '',
      ),
    );
    console.log('action ', enabled);
  }, [loadRecipeIngredients]);

  useEffect(() => {
    if (getText.index != null) {
      console.log('EditToRecipeData : ', getText);
      let nameData = {
        index: getText.index,
        property: 'ingredientName',
        text: getText.ingredientName,
      };
      let idData = {
        index: getText.index,
        property: 'ingredientId',
        text: getText.ingredientId,
      };
      console.log('editToRecipeData ', nameData);
      console.log('editToRecipeData ', idData);
      dispatch(updateRecipeIngredientWithIndex(nameData));
      dispatch(updateRecipeIngredientWithIndex(idData));
      dispatch(initSaveIngredientToTarget());
    }
  }, [getText]);

  const addComponent = () => {
    let newArr = [...loadRecipeIngredients];

    const key = newArr.length >= 1 ? newArr[newArr.length - 1].key + 1 : 1;

    newArr.push({
      key: key,
      ingredientName: null,
      ingredientId: null,
      quantity: null,
    });

    dispatch(setRecipeIngredients(newArr));
  };

  const deleteItem = index => () => {
    let newArr = loadRecipeIngredients.filter(
      (row, itemIndex) => index !== itemIndex,
    );

    dispatch(setRecipeIngredients(newArr));
  };

  return (
    <>
      <RecipeEditScreenContainer edges={['top']} />
      <View style={{marginBottom: 3}}>
        <Title
          enabled={enabled}
          navigation={navigation}
          totalStep={3}
          nowStep={2}
          nextNavigation={'RecipeEditThirdScreen'}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1, backgroundColor: 'white'}}>
        <PrepOrderContainer>
          <OrderTitle>재료</OrderTitle>
          <TextInputListContainer>
            {loadRecipeIngredients.map((item, index) => {
              return (
                <TextInputLowContainer>
                  <TextInputContainer>
                    <TextInputBox
                      placeholder="당근"
                      placeholderTextColor="#a4a4a4"
                      value={item.ingredientName}
                      onChange={onChangeText(index, 'ingredientName')}
                      onFocus={() => {
                        setSendText(() => item.ingredientName);
                        setFocus(true);
                        setSelectIndex(index);
                      }}
                      onBlur={() => {
                        setFocus(false);
                        setSelectIndex(0);
                      }}
                      autoComplete={'off'}
                    />
                    <VerticalBar />
                    <TextInputBox
                      placeholder="예)1스푼"
                      placeholderTextColor="#a4a4a4"
                      value={item.quantity}
                      onChange={onChangeText(index, 'quantity')}
                    />
                  </TextInputContainer>
                  <TouchableOpacity onPress={deleteItem(index)}>
                    <Image source={require('../../assets/images/Cancel.png')} />
                  </TouchableOpacity>
                </TextInputLowContainer>
              );
            })}
            <>
              <AddPrepOrder>
                <AddPrepOrderText>재료 추가</AddPrepOrderText>
                <TouchContainer onPress={addComponent}>
                  <AddImage source={require('../../assets/images/Add_o.png')} />
                </TouchContainer>
              </AddPrepOrder>
            </>
          </TextInputListContainer>
        </PrepOrderContainer>
        {isFocus ? (
          <IngredientSelectorComponent
            targetIngredientName={sendText}
            index={selectIndex}
            isFocus={isFocus}
          />
        ) : undefined}
      </KeyboardAvoidingView>

    </>
  );
};

const TextInputBox = styled.TextInput`
  width: 45%;
  height: 100%;

  font-style: normal;
  font-weight: 500;
  font-size: 15px;

  font-family: 'Pretendard Variable';

  color: #666666;
`;

const VerticalBar = styled.View`
  width: 1px;
  height: 50%;
  background: #e1e1e1;
`;

const HorizontalBar = styled.View`
  background: #e1e1e1;
  width: 100%;
  height: ${props => props.height};
`;

const TextInputContainer = styled.View`
  border-radius: 8px;
  border: 1px solid #d8d8d8;
  background: #ffffff;

  width: 85%;
  height: 40px;

  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: space-between;
`;

const AddPrepOrder = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  border-top-width: 1px;
  border-top-color: #e1e1e1;
  border-bottom-width: 4px;
  border-bottom-color: #e1e1e1;
`;

const AddPrepOrderText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  font-family: 'Pretendard Variable';

  color: #f09311;
`;

const TouchContainer = styled.TouchableOpacity``;
const AddImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const TextInputLowContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;

  margin-bottom: 15px;
`;

const TextInputListContainer = styled.View`

  flex-direction: column;
`;

const PrepOrderContainer = styled.ScrollView`
  width: 100%;
  height: 100%;

  position: relative;
`;

const OrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 10px;
  font-family: 'Pretendard Variable';
  padding: 18px;
  color: #333333;
`;

const RecipeEditScreenContainer = styled.SafeAreaView`
  background: #ffffff;
`;

export default RecipeEditSecondScreen;

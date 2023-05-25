import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {ImageAndCameraFun} from '../../components/atoms/functions/ImageAndCameraFun';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {
  initRecipe,
  setRecipeRows,
  updateRecipeRowWithIndex,
} from '../../store/RecipeEdit/TempRecipeEditInfoSlice';
import {
  hardRemoveRecipes,
  requestRegisterRecipe,
  requestRegisterRecipeIngredients,
  requestRegisterRecipeRows,
} from '../../services/recipe/Recipe';
import AlertYesNoButton from '../../components/molecules/AlertYesNoButton';
import AlertYesButton from '../../components/molecules/AlertYesButton';
import Loading from '../../components/molecules/Loading';

const RecipeEditThirdScreen = ({navigation}) => {
  const toast = useToast();
  const [isAlert, setAlert] = useState(false);
  const [photo, setPhoto] = useState({uri: ''});
  const dispatch = useDispatch();
  const loadData = useSelector(state => state.editRecipeInfo).recipeRows;
  const loadRecipeAll = useSelector(state => state.editRecipeInfo);
  const [photoProps, setPhotoProps] = useState({
    index: null,
    property: 'photo',
  });
  const [enabled, setEnabled] = useState(false);
  const [isExceptionAlert, setExceptionAlert] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isCancelAlert, setCancelAlert] = useState(false);

  useEffect(() => {
    if (photoProps.index != null) {
      const data = {...photoProps, text: photo};
      dispatch(updateRecipeRowWithIndex(data));
      setPhotoProps({...photoProps, index: null});
    }
  }, [photo]);

  useEffect(() => {
    setEnabled(() => true);
    loadData.forEach(data =>
      setEnabled(
        enabled =>
          enabled &&
          data.description !== null &&
          data.description.trim() !== '',
      ),
    );
  }, [loadData]);

  const addComponent = () => {
    let newArr = [...loadData];

    newArr.push({
      id: newArr[newArr.length - 1].id + 1,
      description: null,
      photo: {uri: ''},
    });
    dispatch(setRecipeRows(newArr));
  };

  const dataUpdateTextHandler = (index, property) => e => {
    let data = {index: index, property: property, text: e.nativeEvent.text};
    dispatch(updateRecipeRowWithIndex(data));
    console.log(loadData);
  };

  const deleteItem = index => () => {
    let newArr = loadData.filter((row, itemIndex) => index !== itemIndex);

    dispatch(setRecipeRows(newArr));
  };

  const saveData = async () => {
    setSaving(() => true);
    const recipe = {
      title: loadRecipeAll.title,
      description: loadRecipeAll.description,
      quantity: loadRecipeAll.quantity,
      level: loadRecipeAll.level,
      time: loadRecipeAll.time,
      sort: loadRecipeAll.sort,
      secondCategory: loadRecipeAll.situationCategory,
      thumbnail: loadRecipeAll.thumbnail,
    };
    console.log('recipe : ', recipe);
    await requestRegisterRecipe(recipe)
      .then(async res => {
        console.log(res);
        const data = JSON.parse(res.request._response);
        console.log(data);
        const recipeId = data.recipeId;

        requestRegisterRecipeIngredients(
          recipeId,
          loadRecipeAll.recipeIngredients,
        )
          .then(async res => {
            const result = Promise.all(
              loadData.map(data => {
                return requestRegisterRecipeRows(recipeId, data);
              }),
            );
            result.then(res => {
              dispatch(initRecipe());
              setSaving(false);
              navigation.reset({
                routes: [
                  {name: 'Home'},
                  {name: 'RecipeDetailScreen', params: {boardId: recipeId}},
                ],
              });
            });
            result.catch(err => {
              setExceptionAlert(true);
              hardRemoveRecipes(recipeId);
              setSaving(false);
            });
          })
          .catch(err => {
            setExceptionAlert(true);
            hardRemoveRecipes(recipeId);
            setSaving(false);
          });
      })
      .catch(err => {
        console.log(err);
        setSaving(false);
      });
  };

  const deletePhoto = () => {
    const data = {...photoProps, text: {uri: ''}};
    dispatch(updateRecipeRowWithIndex(data));
    setPhotoProps({...photoProps, index: null});
  };

  return (
    <>
      <RecipeEditThirdScreenContainer edges={['top']} />
      <ImageAndCameraFun
        toast={toast}
        setAlert={setAlert}
        isAlert={isAlert}
        setPhoto={setPhoto}
      />
      <Title
        totalStep={3}
        nowStep={3}
        navigation={navigation}
        nextNavigation={'RecipeScreen'}
        enabled={enabled}
        request={saveData}
      />
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1, backgroundColor: 'white', marginTop: 10}}>
        <InnerContainer>
          <OrderTitle>손질 순서</OrderTitle>
          {loadData.map((item, index) => {
            return (
              <View
                style={{
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  marginBottom: 10,
                  flexDirection: 'row',
                }}>
                <PrepOrderItem>
                  <PrepOrderNum>
                    <PrepOrderNumText>{index + 1}</PrepOrderNumText>
                  </PrepOrderNum>
                  <PrepOrderInfo>
                    {item.photo.uri === '' ? (
                      <ImageSelectBox
                        onPress={() => {
                          setAlert(true);
                          setPhotoProps({...photoProps, index: index});
                        }}>
                        <Image
                          source={require('../../assets/images/_격리_모드.png')}
                        />
                      </ImageSelectBox>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setCancelAlert(true);
                          setPhotoProps({...photoProps, index: index});
                        }}>
                        <Image
                          style={{width: 98, height: 98, borderRadius: 8}}
                          source={{uri: item.photo.uri}}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    )}
                    <PrepOrderContentTextInput
                      multiline={true}
                      scrollEnabled={false}
                      value={item.description}
                      onChange={dataUpdateTextHandler(index, 'description')}
                      placeholder={
                        '예) 준비된 양념으로 고기를 조물조물 재워둡니다'
                      }
                      placeholderTextColor={'#a0a0a0'}
                    />
                  </PrepOrderInfo>
                </PrepOrderItem>
                <View style={{position: 'absolute', right: 10, top: 5}}>
                  <TouchableOpacity onPress={deleteItem(index)}>
                    <PrepOrderCancel
                      source={require('../../assets/images/Cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <AddPrepOrder>
            <AddPrepOrderText>요리 순서 추가</AddPrepOrderText>
            <TouchContainer onPress={addComponent}>
              <AddImage source={require('../../assets/images/Add_o.png')} />
            </TouchContainer>
          </AddPrepOrder>
        </InnerContainer>
      </KeyboardAvoidingView>
      {isCancelAlert ? (
        <AlertYesNoButton
          title={'이미지를 삭제할까요?'}
          setAlert={setCancelAlert}
          yesButtonText={'네'}
          text={'이미지가 있으면 보기 편해져요!'}
          onPress={() => {
            deletePhoto();
            setCancelAlert(false);
          }}
        />
      ) : undefined}
      {isExceptionAlert ? (
        <AlertYesButton
          title={'업로드 중 알수 없는 에러가 발생했습니다.'}
          setAlert={setCancelAlert}
          text={'다시 한번 저장해보시고, 안되시면 레시피톡에 문의해주세요'}
          onPress={() => {
            setExceptionAlert(false);
          }}
        />
      ) : undefined}
      {saving ? <Loading /> : undefined}
    </>
  );
};

const InnerContainer = styled.ScrollView`
  height: 100%;
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

const RecipeEditThirdScreenContainer = styled.SafeAreaView`
  background: #ffffff;
`;

const OrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  font-family: 'Pretendard Variable';

  color: #333333;
  padding: 18px;
`;

const PrepOrderItem = styled.View`
  flex-direction: row;
  width: 85%;
  align-items: center;
`;
const PrepOrderNum = styled.View`
  width: 22px;
  height: 22px;
  background: #f09311;
  border-radius: 26px;
  justify-content: center;
  margin-right: 10px;
`;

const PrepOrderNumText = styled.Text`
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  color: #ffffff;
`;

const PrepOrderInfo = styled.View`
  width: 100%;
  height: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  flex-direction: row;
  padding: 5%;
  gap: 10px;
  align-items: center;
`;

const PrepOrderContentTextInput = styled.TextInput`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  flex: 1;
  color: #666666;
`;
const PrepOrderCancel = styled.Image`
  width: 22px;
  height: 22px;
`;

const TouchContainer = styled.TouchableOpacity``;

const AddImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const ImageSelectBox = styled.TouchableOpacity`
  width: 98px;
  height: 98px;
  background: #ededed;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export default RecipeEditThirdScreen;

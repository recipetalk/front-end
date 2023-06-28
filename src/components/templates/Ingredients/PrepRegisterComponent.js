import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, Platform} from 'react-native';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {
  addIngredientTrimming,
  addRowIngredientTrimming,
  editIngredientTrimming,
  editRowIngredientTrimming,
  hardDelete,
} from '../../../services/Ingredients';
import {isEmptyArr} from '../../../utils/Validation';
import {ImageAndCameraFun} from '../../atoms/functions/ImageAndCameraFun';
import Line from '../../atoms/Line';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import PrepIntro from '../../organisms/Ingredients/PrepIntro';

const PrepRegisterComponent = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const toast = useToast();
  const prepState = useSelector(state => state.prep);
  const [index, setIndex] = useState(null);
  const [isAlert, setAlert] = useState(false);
  const [prepInfo, setPrepInfo] = useState(
    isEmptyArr(prepState)
      ? {
          id: router.params.ingredientID,
          title: '',
          desc: '',
          img: '',
        }
      : {
          id: prepState.ingredient.ingredientId,
          title: prepState.boardDTO.title,
          desc: prepState.description,
          img: prepState.thumbnailURI,
        },
  );

  const [rows, setRows] = useState(
    isEmptyArr(prepState)
      ? [
          {
            id: 1,
            description: '',
            photo: {uri: ''},
          },
        ]
      : prepState.trimmingRows,
  );

  const [thumbnailPhoto, setThumbnailPhoto] = useState(
    isEmptyArr(prepState)
      ? {photo: {uri: ''}}
      : {photo: {uri: prepState.thumbnailURI}},
  );

  const addComponent = () => {
    let newArr = [...rows];

    newArr.push({
      id: newArr[newArr.length - 1].id + 1,
      description: null,
      photo: {uri: ''},
    });
    setRows(newArr);
  };

  const dataUpdateTextHandler = (index, property) => e => {
    let newArr = [...rows];

    newArr[index][property] = e.nativeEvent.text;
    console.log('PrepRegisterComponent', newArr[index][property]);
    setRows(newArr);
  };

  const dataUpdatePhoto = index => value => {
    let newArr = [...rows];

    newArr[index].photo = value;
    console.log('PrepRegisterComponent', value);
    setRows(newArr);
  };

  const deleteItem = index => () => {
    let newArr = rows.filter((row, itemIndex) => index !== itemIndex);

    setRows(newArr);
  };

  const registerPrepOrder = async () => {
    const ingredient = {
      ingredientId: router.params.ingredientID,
      title: prepInfo.title,
      desc: prepInfo.desc,
      img: thumbnailPhoto,
    };

    await addIngredientTrimming(ingredient)
      .then(async res => {
        const data = JSON.parse(res.request._response);

        const result = Promise.all(
          rows.map(item => {
            return addRowIngredientTrimming({
              ingredientId: router.params.ingredientID,
              trimmingId: data.ingredientTrimmingId,
              itemList: item,
            });
          }),
        );

        result.then(res2 => {
          console.log('PrepRegisterComponent res2 is ', res2);
          navigation.goBack();
        });
        result.catch(error => {
          console.error('PrepRegisterComponent error', error);
          hardDelete(data.ingredientTrimmingId);
        });
      })
      .catch(error => console.log('PrepRegisterComponent', error.response));
  };

  const editPrepOrder = async () => {
    const newData = {
      trimmingId: prepState.boardDTO.boardId,
      title: prepInfo.title,
      description: prepInfo.desc,
      thumbnail: thumbnailPhoto,
      isThumbnailDeleted: true,
    };

    await editIngredientTrimming(newData)
      .then(async res => {
        const result = Promise.all(
          rows.map((item, index) => {
            return editRowIngredientTrimming({
              ingredientId: prepState.ingredient.ingredientId,
              trimmingId: prepState.boardDTO.boardId,
              itemList: item,
              isLast: rows.length === index + 1,
            });
          }),
        );

        result.then(navigation.goBack());
        result.catch(error => {
          console.error('error', error);
          hardDelete(prepState.boardDTO.boardId);
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <IngredientsHeader title="손질법" isTitleOnly={true} />
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}>
        <FlatList
          data={rows}
          renderItem={({item, index}) => (
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
                        setIndex(index);
                      }}>
                      <Image
                        source={require('../../../assets/images/Camera_Icon.png')}
                      />
                    </ImageSelectBox>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setAlert(true);
                        setIndex(index);
                      }}>
                      <Image
                        style={{width: 98, height: 98, borderRadius: 8}}
                        source={{uri: item.photo.uri}}
                        resizeMode="contain"
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
                    source={require('../../../assets/images/Cancel.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={
            <>
              <AddPrepOrder>
                <AddPrepOrderText>손질 순서 추가</AddPrepOrderText>
                <TouchContainer onPress={addComponent}>
                  <AddImage
                    source={require('../../../assets/images/Add_o.png')}
                  />
                </TouchContainer>
              </AddPrepOrder>
              <BtnContainer>
                <CancelBtn onPress={() => navigation.goBack()}>
                  <CancelText>취소</CancelText>
                </CancelBtn>
                <SaveBtn
                  onPress={
                    isEmptyArr(prepState) ? registerPrepOrder : editPrepOrder
                  }>
                  <SaveText>저장</SaveText>
                </SaveBtn>
              </BtnContainer>
            </>
          }
          ListHeaderComponent={
            <>
              <PrepIntro
                isEdit={true}
                state={prepInfo}
                setThumbnailPhoto={setThumbnailPhoto}
                thumbnailPhoto={thumbnailPhoto}
                setState={setPrepInfo}
              />
              <Line />
              <ImageAndCameraFun
                toast={toast}
                setAlert={setAlert}
                isAlert={isAlert}
                setPhoto={dataUpdatePhoto(index)}
              />
              <OrderTitle>손질 순서</OrderTitle>
            </>
          }
        />
      </KeyboardAvoidingView>
    </>
  );
};

const OrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  font-family: 'Pretendard Variable';

  color: #333333;
  padding: 18px;
`;

const AddPrepOrder = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
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

const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  padding: 18px;
`;

const CancelBtn = styled.TouchableOpacity`
  width: 80px;
  height: 50px;
  background: #e1e1e1;
  border-radius: 8px;
  justify-content: center;
`;

const CancelText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #666666;
  font-family: 'Pretendard Variable';
`;

const SaveBtn = styled.TouchableOpacity`
  width: 80px;
  height: 50px;
  background: #f09311;
  border-radius: 8px;
  justify-content: center;
`;

const SaveText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  font-family: 'Pretendard Variable';
`;

const PrepOrderItem = styled.View`
  display: flex;
  flex-direction: row;
  width: 85%;
  align-items: center;
`;
const PrepOrderNum = styled.View`
  width: 22px;
  height: 22px;
  background: #f09311;
  border-radius: 50px;
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

const ImageSelectBox = styled.TouchableOpacity`
  width: 98px;
  height: 98px;
  background: #ededed;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export default PrepRegisterComponent;

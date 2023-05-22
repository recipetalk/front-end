import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {ImageAndCameraFun} from '../../components/atoms/functions/ImageAndCameraFun';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {
  setRecipeRows,
  updateRecipeRowWithIndex,
} from '../../store/RecipeEdit/TempRecipeEditInfoSlice';
import {requestRegisterRecipe} from '../../services/recipe/Recipe';

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
  const [enabled, setEndabled] = useState(false);

  useEffect(() => {
    if (photoProps.index != null) {
      const data = {...photoProps, text: photo};
      dispatch(updateRecipeRowWithIndex(data));
      setPhotoProps({...photoProps, index: null});
    }
  }, [photo]);

  useEffect(() => {}, [loadData]);

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
      .then(res => {
        console.log(res);
        const data = JSON.parse(res.request._response);
        console.log(data);
      })
      .catch(err => console.error(err));
  };

  return (
    <RecipeEditThirdScreenContainer>
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
        enabled={true}
        request={saveData}
      />

      <OrderTitle>손질 순서</OrderTitle>
      <FlatList
        data={loadData}
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
                      setPhotoProps({...photoProps, index: index});
                    }}>
                    <Image
                      source={require('../../assets/images/_격리_모드.png')}
                    />
                  </ImageSelectBox>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setAlert(true);
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
                  placeholder={'예) 준비된 양념으로 고기를 조물조물 재워둡니다'}
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
        )}
        ListFooterComponent={
          <AddPrepOrder>
            <AddPrepOrderText>요리 순서 추가</AddPrepOrderText>
            <TouchContainer onPress={addComponent}>
              <AddImage source={require('../../assets/images/Add_o.png')} />
            </TouchContainer>
          </AddPrepOrder>
        }
      />
    </RecipeEditThirdScreenContainer>
  );
};

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

const RecipeEditThirdScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
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
  display: flex;
  flex-direction: row;
  width: 85%;
`;
const PrepOrderNum = styled.View`
  width: 22px;
  height: 22px;
  background: #f09311;
  border-radius: 50px;
  justify-content: center;
  margin-right: 15px;
  top: 65px;
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

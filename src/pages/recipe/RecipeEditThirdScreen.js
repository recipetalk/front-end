import React, {useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {ImageAndCameraFun} from '../../components/atoms/functions/ImageAndCameraFun';
import {useToast} from 'react-native-toast-notifications';

const RecipeEditThirdScreen = ({navigation}) => {
  const toast = useToast();
  const [isAlert, setAlert] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      description: '',
      photo: {uri: ''},
    },
  ]);

  const [index, setIndex] = useState(null);

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
    console.log(newArr[index][property]);
    setRows(newArr);
  };

  const dataUpdatePhoto = index => value => {
    let newArr = [...rows];

    newArr[index].photo = value;
    console.log(value);
    setRows(newArr);
  };

  const deleteItem = index => () => {
    let newArr = rows.filter((row, itemIndex) => index !== itemIndex);

    setRows(newArr);
  };

  return (
    <RecipeEditThirdScreenContainer>
      <ImageAndCameraFun
        toast={toast}
        setAlert={setAlert}
        isAlert={isAlert}
        setPhoto={dataUpdatePhoto(index)}
      />
      <Title
        totalStep={3}
        nowStep={3}
        navigation={navigation}
        nextNavigation={'RecipeScreen'}
      />

      <OrderTitle>손질 순서</OrderTitle>
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
                      source={require('../../assets/images/_격리_모드.png')}
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

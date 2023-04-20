import React, {useState} from 'react';
import styled from 'styled-components/native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {FlatList, Image, TouchableOpacity} from 'react-native';

const RecipeEditSecondScreen = ({navigation}) => {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      ingredientName: null,
      ingredientId: null,
      quantity: null,
    },
    {
      id: 2,
      ingredientName: null,
      ingredientId: null,
      quantity: null,
    },
    {
      id: 3,
      ingredientName: null,
      ingredientId: null,
      quantity: null,
    },
  ]);

  const onChangeText = (index, property) => e => {
    let newArr = [...ingredients];

    newArr[index][property] = e.nativeEvent.text;
    console.log(newArr[index][property]);
    setIngredients(newArr);
  };

  const addComponent = () => {
    let newArr = [...ingredients];

    newArr.concat([
      {
        id: newArr.length,
        ingredientName: null,
        ingredientId: null,
        quantity: null,
      },
    ]);

    console.log(newArr);
    setIngredients(newArr);
  };

  return (
    <RecipeEditScreenContainer>
      <Title
        navigation={navigation}
        totalStep={3}
        nowStep={2}
        nextNavigation={'RecipeEditThirdScreen'}
      />
      <PrepOrderContainer>
        <OrderTitle>재료</OrderTitle>
        <TextInputListContainer>
          <FlatList
            keyExtractor={_ => _.id}
            data={ingredients}
            renderItem={({item, index}) => (
              <TextInputLowContainer>
                <TextInputContainer>
                  <TextInputBox
                    placeholder="당근"
                    placeholderTextColor="#a4a4a4"
                    value={item.ingredientName}
                    onChange={onChangeText(index, 'ingredientName')}
                  />
                  <VerticalBar />
                  <TextInputBox
                    placeholder="예)1스푼"
                    placeholderTextColor="#a4a4a4"
                    value={item.quantity}
                    onChange={onChangeText(index, 'quantity')}
                  />
                </TextInputContainer>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/Cancel.png')} />
                </TouchableOpacity>
              </TextInputLowContainer>
            )}
          />
        </TextInputListContainer>
      </PrepOrderContainer>
      <HorizontalBar height={'1px'} />
      <AddPrepOrder>
        <AddPrepOrderText>재료 추가</AddPrepOrderText>
        <TouchContainer onPress={addComponent}>
          <AddImage source={require('../../assets/images/Add_o.png')} />
        </TouchContainer>
      </AddPrepOrder>
      <HorizontalBar height={'4px'} />
    </RecipeEditScreenContainer>
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
`;

const AddPrepOrderText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  font-family: 'Pretendard Variable';

  color: #f09311;
`;

const PrepOrderAddImage = styled.View`
  display: flex;
  flex-direction: row;
  background: white;
  padding: 0 10px;
  gap: 10px;
`;

const AddImageItem = styled.View`
  width: 65px;
  height: 65px;
  background: #ededed;
  border-radius: 8px;
`;

const AddImgView = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border-radius: 4px;
  position: absolute;
  justify-content: center;
`;

const AddImg = styled.Image`
  margin: auto;
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
  display: flex;
  flex-direction: column;
`;

const PrepOrderContainer = styled.View`
  width: 90%;
  margin: 15px auto 0;
  gap: 15px;
`;

const OrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;

  font-family: 'Pretendard Variable';

  color: #333333;
`;

const RecipeEditScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: #ffffff;
`;

export default RecipeEditSecondScreen;

import React, {useState} from 'react';
import styled from 'styled-components/native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

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

    newArr.push({
      id: newArr[newArr.length - 1].id + 1,
      ingredientName: null,
      ingredientId: null,
      quantity: null,
    });

    console.log(newArr);
    setIngredients(newArr);
  };

  const deleteItem = index => () => {
    let newArr = ingredients.filter((row, itemIndex) => index !== itemIndex);

    setIngredients(newArr);
  };

  return (
    <>
      <RecipeEditScreenContainer edges={['top']} />
      <View style={{marginBottom: 3}}>
        <Title
          enabled={true}
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
            <FlatList
              keyExtractor={_ => _.id}
              data={ingredients}
              ListFooterComponent={() => (
                <>
                  <HorizontalBar height={'1px'} />
                  <AddPrepOrder>
                    <AddPrepOrderText>재료 추가</AddPrepOrderText>
                    <TouchContainer onPress={addComponent}>
                      <AddImage
                        source={require('../../assets/images/Add_o.png')}
                      />
                    </TouchContainer>
                  </AddPrepOrder>
                  <HorizontalBar height={'4px'} />
                </>
              )}
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
                  <TouchableOpacity onPress={deleteItem(index)}>
                    <Image source={require('../../assets/images/Cancel.png')} />
                  </TouchableOpacity>
                </TextInputLowContainer>
              )}
            />
          </TextInputListContainer>
        </PrepOrderContainer>
      </KeyboardAvoidingView>
      <RecipeEditScreenContainer edges={['bottom']} />
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
  display: flex;
  flex-direction: column;
`;

const PrepOrderContainer = styled.View`
  width: 90%;
  height: 100%;
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
  background: #ffffff;
`;

export default RecipeEditSecondScreen;

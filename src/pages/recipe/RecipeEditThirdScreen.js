import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import Title from '../../components/atoms/board/recipe/edit/Title';

const RecipeEditThirdScreen = ({navigation}) => {
  return (
    <RecipeEditThirdScreenContainer>
      <Title
        totalStep={3}
        nowStep={3}
        navigation={navigation}
        nextNavigation={'RecipeScreen'}
      />
      <PrepOrderContainer>
        <OrderTitle>손질 순서</OrderTitle>
        {[1, 2, 3, 4].map(i => {
          return (
            <PrepOrderItem key={i}>
              <PrepOrderNum>
                <PrepOrderNumText>{i}</PrepOrderNumText>
              </PrepOrderNum>
              <PrepOrderInfo>
                <PrepOrderHeader>
                  <PrepOrderContent>
                    <PrepOrderContentText>
                      {'예) 준비된 양념으로 고기를 조물조물 재워둡니다.'}
                    </PrepOrderContentText>
                  </PrepOrderContent>

                  <PrepOrderCancel
                    source={require('../../assets/images/Cancel.png')}
                  />
                </PrepOrderHeader>
                <PrepOrderAddImage>
                  {[1, 2, 3].map(i => {
                    return (
                      <View key={i}>
                        <AddImageItem />
                        <AddImgView>
                          <AddImg
                            source={require('../../assets/images/Add_g.png')}
                          />
                        </AddImgView>
                      </View>
                    );
                  })}
                </PrepOrderAddImage>
              </PrepOrderInfo>
            </PrepOrderItem>
          );
        })}
      </PrepOrderContainer>
      <AddPrepOrder>
        <AddPrepOrderText>요리 순서 추가</AddPrepOrderText>
        <TouchContainer>
          <AddImage source={require('../../assets/images/Add_o.png')} />
        </TouchContainer>
      </AddPrepOrder>
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

  color: #f09311;
`;

const RecipeEditThirdScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: #ffffff;
`;

const PrepOrderContainer = styled.ScrollView``;

const OrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;

  color: #333333;
  padding: 18px;
`;

const PrepOrderItem = styled.View`
  display: flex;
  flex-direction: row;
  height: 140px;
  margin: 15px;
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

  color: #ffffff;
`;

const PrepOrderInfo = styled.View`
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
`;

const PrepOrderHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;
const PrepOrderContent = styled.View`
  width: 200px;
  height: 38px;
`;

const PrepOrderContentText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  color: #a0a0a0;
`;
const PrepOrderCancel = styled.Image`
  width: 22px;
  height: 22px;
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

export default RecipeEditThirdScreen;

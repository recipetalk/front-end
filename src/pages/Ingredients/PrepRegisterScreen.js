import React from 'react';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import Line from '../../components/atoms/Line';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../components/organisms/Ingredients/IngredientsInfo';

const PrepRegisterScreen = () => {
  return (
    <PrepEditScreenContainer>
      <IngredientsHeader title="손질법" isTitleOnly={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <IngredientsInfo isEdit={true} />

        <PrepIntro>
          <Title>제목</Title>
          <PrepInput
            placeholder="나만의 손질법을 소개해주세요.
        예) 자취 8년차 언제 먹어도 질리지 않는 맛있는 된장찌개!"
          />
        </PrepIntro>

        <Line />

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

        <Line />

        <AddPrepOrder>
          <AddPrepOrderText>손질 순서 추가</AddPrepOrderText>
          <TouchContainer>
            <AddImage source={require('../../assets/images/Add_o.png')} />
          </TouchContainer>
        </AddPrepOrder>

        <Line />

        <BtnContainer>
          <CancelBtn>
            <CancelText>취소</CancelText>
          </CancelBtn>
          <SaveBtn>
            <SaveText>저장</SaveText>
          </SaveBtn>
        </BtnContainer>
      </ScrollView>
    </PrepEditScreenContainer>
  );
};
const PrepEditScreenContainer = styled.SafeAreaView`
  background-color: #ffffff;
  height: 100%;
`;

const PrepIntro = styled.View`
  padding: 18px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  font-family: 'Pretendard Variable';

  color: #a4a4a4;
  margin-bottom: 10px;
`;

const PrepInput = styled.TextInput`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 50px;
  font-family: 'Pretendard Variable';
`;

const PrepOrderContainer = styled.View`
  margin-bottom: 20px;
`;

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
  height: 140px;
  margin: 15px;
`;
const PrepOrderNum = styled.View`
  width: 22px;
  height: 22px;
  background-color: #f09311;
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
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
`;
const PrepOrderCancel = styled.Image`
  width: 22px;
  height: 22px;
`;
const PrepOrderAddImage = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 0 10px;
  gap: 10px;
`;

const AddImageItem = styled.View`
  width: 65px;
  height: 65px;
  background-color: #ededed;
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
export default PrepRegisterScreen;

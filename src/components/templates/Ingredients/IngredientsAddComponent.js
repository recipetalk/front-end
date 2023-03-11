import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Line from '../../atoms/Line';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsItem from '../../organisms/Ingredients/IngredientsItem';
import Checkbox from '@react-native-community/checkbox';

const IngredientsAddComponent = () => {
  const dummy = [1, 2, 3, 4, 5];
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [isAddChecked, setIsAddChecked] = useState(false);

  return (
    <IngredientsAddComponentContainer>
      <IngredientsHeader
        title="내 식재료 등록하기"
        isTitleOnly={true}
        btnTextValue=""
      />
      <ScannerContainer>
        <ScanSection>
          <ScanImage
            source={require('../../../assets/images/Barcode_Shooting_f09.png')}
          />
          <ScanText>바코드 스캔하기</ScanText>
        </ScanSection>
      </ScannerContainer>
      <Line />
      <AddIngredients>
        <AddIngredientsText>재료 직접 추가</AddIngredientsText>
        <TouchContainer onPress={() => setIsPressed(true)}>
          <AddImage source={require('../../../assets/images/Add_o.png')} />
        </TouchContainer>
      </AddIngredients>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isPressed ? (
          <AddIngredientsSection>
            <RecentIngredientsText>식재료 등록하기</RecentIngredientsText>
            <AddIngredientsItem>
              <CheckBoxViewContainer>
                <CheckBoxView>
                  <AddCheckbox
                    value={isAddChecked}
                    onValueChange={setIsAddChecked}
                    onFillColor="#F09311"
                    tintColors={{true: '#F09311', false: '#A4A4A4'}}
                    boxType="square"
                    tintColor="#A4A4A4"
                    onCheckColor="#FFFFFF"
                    onTintColor="#F09311"
                  />
                  <AddText>이 식재료 추가</AddText>
                </CheckBoxView>

                <DelText>재료 삭제</DelText>
              </CheckBoxViewContainer>

              <ContentTitle>식재료 명</ContentTitle>
              <RegisterContainer>
                <RegisterInput placeholder="  예) 감자  " />
              </RegisterContainer>
              <StatusContainer>
                <StatusText>상태 입력</StatusText>
                <StatusInput placeholder="  예) 1개 " />
              </StatusContainer>
              <StatusContainer>
                <StatusText>유통 기한</StatusText>
                <StatusInput placeholder="  예) 1개 " />
              </StatusContainer>
              <StatusContainer>
                <StatusText>수량 입력</StatusText>
                <StatusInput placeholder="  예) 1개 " />
              </StatusContainer>
              <RegisterButton>
                <RegisterButtonText>
                  총 1개의 식재료 등록하기
                </RegisterButtonText>
              </RegisterButton>
            </AddIngredientsItem>
          </AddIngredientsSection>
        ) : (
          <>
            <RecentIngredients>
              <RecentIngredientsText>최근 등록된 식재료</RecentIngredientsText>
              <TouchContainer
                onPress={() => navigation.navigate('Ingredients')}>
                <TotalContainer>
                  <TotalImg
                    source={require('../../../assets/images/Add_o.png')}
                  />
                  <TotalText>전체보기</TotalText>
                </TotalContainer>
              </TouchContainer>
            </RecentIngredients>

            {dummy.map((v, i) => {
              return <IngredientsItem key={i} />;
            })}
          </>
        )}
      </ScrollView>
    </IngredientsAddComponentContainer>
  );
};

const IngredientsAddComponentContainer = styled.View`
  margin-bottom: 600px;
`;
const ScannerContainer = styled.View`
  width: 100%;
  height: 170px;
  background-color: #ffffff;
`;

const ScanSection = styled.View`
  width: 250px;
  height: 135px;

  background: #fff4e5;

  border: 1px solid #f09311;
  border-radius: 5px;
  margin: auto;
  justify-content: center;
`;

const ScanText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;

  color: #f09311;
  text-align: center;
`;

const ScanImage = styled.Image`
  width: 40px;
  height: 40px;
  margin: 0 auto 10px auto;
`;

const AddIngredients = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: #ffffff;
`;

const AddIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #f09311;
`;

const TouchContainer = styled.TouchableOpacity``;
const AddImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const RecentIngredients = styled.View`
  padding: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const RecentIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  color: #333333;
`;

const TotalContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const TotalImg = styled.Image`
  width: 15px;
  height: 15px;
`;

const TotalText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: #f09311;
`;

const AddIngredientsItem = styled.View`
  margin-top: 18px;
`;

const CheckBoxViewContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const CheckBoxView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const AddCheckbox = styled(Checkbox)`
  width: 22px;
  height: 22px;
`;
const AddText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #f09311;
`;
const DelText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #a0a0a0;
`;

const ContentTitle = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
`;

const RegisterContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
`;

const RegisterInput = styled.TextInput`
  background: #ffffff;
  width: 100%;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
`;

const StatusContainer = styled.View`
  height: 80px;
  display: flex;
  flex-direction: row;
`;

const StatusInput = styled.TextInput`
  background: #ffffff;
  width: 260px;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
`;

const StatusText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #333333;
  margin-right: 25px;
`;

const RegisterButton = styled.View`
  background: #f09311;
  border-radius: 8px;
  height: 48px;
  justify-content: center;
`;

const RegisterButtonText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  text-align: center;

  color: #ffffff;
`;

const AddIngredientsSection = styled.View`
  padding: 18px;
`;
export default IngredientsAddComponent;

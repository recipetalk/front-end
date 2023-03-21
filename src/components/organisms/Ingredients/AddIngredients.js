import React, {useState} from 'react';
import styled from 'styled-components/native';
import Checkbox from '@react-native-community/checkbox';

const AddIngredients = () => {
  const [isAddChecked, setIsAddChecked] = useState(false);

  return (
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
          <RegisterButtonText>총 1개의 식재료 등록하기</RegisterButtonText>
        </RegisterButton>
      </AddIngredientsItem>
    </AddIngredientsSection>
  );
};

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
  font-family: 'Pretendard Variable';
  color: #f09311;
`;
const DelText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';

  color: #a0a0a0;
`;

const RecentIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
  font-family: 'Pretendard Variable';
`;

const ContentTitle = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
  font-family: 'Pretendard Variable';
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
  font-family: 'Pretendard Variable';
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
  font-family: 'Pretendard Variable';
`;

const StatusText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
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
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #ffffff;
`;

const AddIngredientsSection = styled.View`
  padding: 18px;
`;
export default AddIngredients;

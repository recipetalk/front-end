import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import IngredientsItem from './IngredientsItem';

const IngredientsContent = () => {
  const dummy = [1, 2, 3, 4, 5];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Content>
        <ContentTitle>식재료 명</ContentTitle>
        <RegisterContainer>
          <RegisterInput placeholder="  예) 감자  " />
          <RegisterButton>
            <RegisterButtonText>재료 등록</RegisterButtonText>
          </RegisterButton>
        </RegisterContainer>
        <StatusContainer>
          <StatusText>상태 입력</StatusText>
          <RegisterInput placeholder="  예) 1개 " />
        </StatusContainer>
        <StatusContainer>
          <StatusText>유통 기한</StatusText>
          <RegisterInput placeholder="  예) 1개 " />
        </StatusContainer>
        <StatusContainer>
          <StatusText>수량 입력</StatusText>
          <RegisterInput placeholder="  예) 1개 " />
        </StatusContainer>
      </Content>
      {dummy.map((v, i) => {
        return <IngredientsItem key={i} />;
      })}
    </ScrollView>
  );
};

const Content = styled.View`
  height: 300px;
  background-color: #ffffff;
`;

const ContentTitle = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;

  color: #666666;
  margin: 35px 0 10px 25px;
`;

const RegisterContainer = styled.View`
  margin: 0 0 15px 25px;
  display: flex;
  flex-direction: row;
`;

const RegisterInput = styled.TextInput`
  background: #ffffff;
  width: 242px;
  height: 48px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  margin-right: 10px;
`;

const RegisterButton = styled.TouchableOpacity`
  width: 80px;
  height: 48px;
  background: #e1e1e1;
  border-radius: 8px;
  justify-content: center;
`;

const RegisterButtonText = styled.Text`
  text-align: center;
`;

const StatusContainer = styled.View`
  margin: 0 0 10px 25px;
  display: flex;
  flex-direction: row;
`;

const StatusText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  margin-right: 25px;
`;
export default IngredientsContent;

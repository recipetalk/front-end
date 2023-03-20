import React from 'react';
import styled from 'styled-components/native';

const NoticePartComponent = ({navigation}) => {
  return (
    <NoticePart>
      <NavigateTouchButton>
        <NoticeTitle>공지사항</NoticeTitle>
      </NavigateTouchButton>
      <NavigateTouchButton>
        <NoticeTitle>자주 묻는 질문</NoticeTitle>
      </NavigateTouchButton>
      <NavigateTouchButton>
        <NoticeTitle>기타</NoticeTitle>
      </NavigateTouchButton>
    </NoticePart>
  );
};
const NavigateTouchButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 130px;
  gap: 10px;
`;

const NoticePart = styled.View`
  width: 100%;
  background: #ffffff;
  margin-top: 3px;
  padding: 20px;
  gap: 20px;
`;

const NoticeTitle = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: black;
  font-family: 'Pretendard Variable';
`;
export default NoticePartComponent;

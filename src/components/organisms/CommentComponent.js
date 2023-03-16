import React from 'react';
import styled from 'styled-components/native';

const CommentComponent = () => {
  return (
    <CommentComponentContainer>
      <Info>
        <UserInfo>
          <ImageView />
          <UserID>다른 사용자</UserID>
        </UserInfo>

        <TimeInfo>5분전</TimeInfo>
      </Info>

      <ContentText>
        {
          '간장은 어떤 걸 써야 하나요? 양조간장? 진간장? 맛있게 만들어주셔서 감사합니다.'
        }
      </ContentText>
    </CommentComponentContainer>
  );
};

const CommentComponentContainer = styled.View`
  width: 350px;
  height: 90px;

  background: #f5f5f5;
  border-radius: 8px;
  margin: 15px auto 15px;
  padding: 10px;
`;

const Info = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const UserInfo = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ImageView = styled.View`
  width: 30px;
  height: 30px;
  background-color: gray;
  border-radius: 50px;
`;

const UserID = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;

  color: #666666;

  justify-content: center;
`;

const TimeInfo = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
`;

const ContentText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #666666;
`;
export default CommentComponent;

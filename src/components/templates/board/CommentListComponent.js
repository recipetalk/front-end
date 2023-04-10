import React from 'react';
import styled from 'styled-components/native';
import {CommentComponent} from '../../organisms/comment/CommentComponent';

export const CommentListComponent = ({isReply}) => {
  const data = [
    {
      id: 1,
      username: '홍길동',
      nickname: '홍길동',
      description:
        '간리뷰를 4정도 보여줄래요간리뷰를 4정도 보여줄래요간리뷰를 4정도 보여줄래요간리뷰를 4정도 보여줄래요간리뷰를 4정도 보여줄래요간리뷰를 4정도 보여줄래요간리뷰를 4정도 보여줄래요간리뷰를 4정도 보여줄래요',
      existChild: true,
      details: isReply,
      created_date: '2022.11.30',
    },
  ];

  return (
    <Container>
      {isReply ? undefined : (
        <LabelPart>
          <CommentLabel>전체 댓글</CommentLabel>
          <CountLabel>{'545'}개의 댓글</CountLabel>
        </LabelPart>
      )}
      {data.map(item => (
        <CommentComponent
          created_date={item.created_date}
          nickname={item.nickname}
          username={item.username}
          existChild={item.existChild}
          description={item.description}
          details={item.details}
        />
      ))}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: auto;
  background: #ffffff;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 5%;
  padding-bottom: 15%;
  gap: 20px;
`;

const CommentLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
`;

const CountLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #666666;
`;

const LabelPart = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 15px;
`;

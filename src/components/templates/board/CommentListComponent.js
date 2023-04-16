import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {CommentComponent} from '../../organisms/comment/CommentComponent';
import {getChildComment, getParentComment} from '../../../services/Comment';
import {loadLoginFromStorage} from '../../../services/domain/AutoLogin';

export const CommentListComponent = ({
  isReply,
  boardId,
  comment,
  onRefresh,
}) => {
  const [loadUsername, setLoadUsername] = useState('');
  useEffect(() => {
    const setUsername = async () => {
      const load = (await loadLoginFromStorage()).username;
      setLoadUsername(load);
    };
    setUsername();
  }, []);

  return (
    <Container>
      {isReply ? undefined : (
        <LabelPart>
          <CommentLabel>전체 댓글</CommentLabel>
          <CountLabel>{'545'}개의 댓글</CountLabel>
        </LabelPart>
      )}
      {comment.map(item => (
        <CommentComponent
          created_date={item.createdDate}
          profile={item.userProfile}
          existChild={item.childExist}
          description={item.description}
          details={item.details}
          isMine={loadUsername === item.userProfile.username}
          commentId={item.commentId}
          boardId={boardId}
          onRefresh={onRefresh}
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

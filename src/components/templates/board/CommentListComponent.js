import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {CommentComponent} from '../../organisms/comment/CommentComponent';
import {loadLoginFromStorage} from '../../../services/repository/AutoLogin';
import {FlatList} from 'react-native';

export const CommentListComponent = ({
  isReply,
  boardId,
  comment,
  onRefresh,
  onRequest,
  isLoading,
  isLast,
  commentRefresh,
}) => {
  const [loadUsername, setLoadUsername] = useState('');
  useEffect(() => {
    const setUsername = async () => {
      const load = (await loadLoginFromStorage()).username;
      setLoadUsername(load);
    };
    setUsername();
  }, []);

  if (comment.length === 0) {
    return (
      <EmptyContainer>
        <CommentLabel>댓글이 없습니다</CommentLabel>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      {isReply ? undefined : (
        <LabelPart>
          <CommentLabel>전체 댓글</CommentLabel>
        </LabelPart>
      )}

      <FlatList
        data={comment}
        refreshing={commentRefresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.6}
        keyExtractor={_ => _?.commentId}
        onEndReached={() => {
          if (isLoading) {
            return;
          }
          if (!isLast) {
            onRequest();
          }
        }}
        renderItem={({item}) => (
          <>
            <CommentComponent
              comment={item}
              isMine={loadUsername === item.userProfile.username}
              boardId={boardId}
              onRefresh={onRefresh}
              existChild={item.childExist}
            />
            <MarginBox />
          </>
        )}
      />
    </Container>
  );
};
const MarginBox = styled.View`
  height: 15px;
`;
const Container = styled.View`
  width: 100%;
  height: 100%
  background: #ffffff;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 5%;
  padding-bottom: 7%;
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

const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
`;

const LabelPart = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 15px;
`;

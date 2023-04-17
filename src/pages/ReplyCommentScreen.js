import styled from 'styled-components/native';
import React, {useEffect, useState} from 'react';
import {NavigationHeader} from '../components/organisms/mypage/NavigationHeader';
import {CommentComponent} from '../components/organisms/comment/CommentComponent';
import {CommentWriteComponent} from '../components/organisms/comment/CommentWriteComponent';
import {ActivityIndicator, FlatList} from 'react-native';
import {getChildComment} from '../services/Comment';
import {loadLoginFromStorage} from '../services/domain/AutoLogin';

export const ReplyCommentScreen = ({navigation, route}) => {
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [comment, setComment] = useState([]);
  const [pagingNum, setPagingNum] = useState(0);
  const [last, setLast] = useState(true);
  const [loadUsername, setLoadUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setUsername = async () => {
      const load = (await loadLoginFromStorage()).username;
      setLoadUsername(load);
    };
    setLoading(() => true);
    setUsername();
    getChildComment(route.params.boardId, route.params.parentCommentId, 0).then(
      res => {
        const data = JSON.parse(res.request._response);
        setComment(data.content);
        setPagingNum(1);
        setLast(data.last);
        setLoading(() => false);
      },
    );
  }, []);

  const request = () => {
    setLoading(true);
    getChildComment(
      route.params.boardId,
      route.params.parentCommentId,
      pagingNum,
    ).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(comment => comment.concat(data.content));
      setPagingNum(pagingNum => pagingNum++);
      setLast(data.last);
      setLoading(false);
    });
  };

  const onRefresh = async () => {
    setCommentRefresh(true);
    await getChildComment(
      route.params.boardId,
      route.params.parentCommentId,
      0,
    ).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(() => data.content);
      setPagingNum(() => 1);
      setLast(data.last);
      setCommentRefresh(false);
    });
  };

  return (
    <Container>
      <NavigationHeader title={'전체댓글'} navigation={navigation} />
      <ParentComment>
        <CommentComponent
          existChild={false}
          comment={route.params.comment}
          details={true}
        />
      </ParentComment>
      <HorizontalBar />
      <FlatList
        style={{
          backgroundColor: 'white',
          paddingLeft: '7%',
          paddingRight: '7%',
          marginTop: '5%',
          height: '100%',
        }}
        keyExtractor={_ => _.commentId}
        onRefresh={onRefresh}
        refreshing={commentRefresh}
        onEndReached={() => {
          if (loading) {
            return;
          }
          if (!last) {
            request();
          }
        }}
        onEndReachedThreshold={0.6}
        data={comment}
        renderItem={({item}) => (
          <CommentComponent
            comment={item}
            details={true}
            isMine={loadUsername === item.userProfile.username}
            boardId={route.params.boardId}
            onRefresh={onRefresh}
          />
        )}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
      {route.params.comment.userProfile.username !== null ? (
        <CommentWriteComponent
          isAbsolute={false}
          boardId={route.params.boardId}
          parentCommentId={route.params.parentCommentId}
          onRefresh={onRefresh}
        />
      ) : undefined}
    </Container>
  );
};

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
  position: relative;
`;

const ParentComment = styled.View`
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
  padding-bottom: 15px;
  background: #f5f5f5;
`;

const ChildPart = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding-left: 3%;
  background: #ffffff;
`;

import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import RecipeDetailDescription from '../../components/atoms/board/RecipeDetailDescription';
import {CommentWriteComponent} from '../../components/organisms/comment/CommentWriteComponent';
import {getChildComment, getParentComment} from '../../services/Comment';
import {SafeAreaView} from 'react-native-safe-area-context';

const RecipeDetailDescriptionScreen = ({navigation, route}) => {
  const [Checked, setChecked] = useState(true);
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentPagingNum, setCommentPagingNum] = useState(0);
  const [isLast, setLast] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getParentComment(boardId, 0).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(data.content);
      setCommentPagingNum(1);
      setLast(data.last);
    });
  }, []);

  const onRefresh = async () => {
    setCommentRefresh(true);
    await getParentComment(1, 0).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(() => data.content);
      setCommentPagingNum(() => 1);
      setLast(() => data.last);
      setCommentRefresh(false);
    });
  };

  const onRequest = async () => {
    setLoading(() => true);
    await getParentComment(1, commentPagingNum).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(comment => comment.concat(data.content));
      setCommentPagingNum(num => num + 1);
      setLast(() => data.last);
      setLoading(() => false);
    });
  };

  const boardId = 1;
  return (
    <>
      <RecipeDetailDescriptionContainer edges={['top']} />
      <Header>
        <TouchableOpacity
          style={{padding: 9, width: 15, height: 15}}
          onPress={() => navigation.pop()}>
          <Image
            source={require('../../assets/images/Back_w.png')}
            resizeMode="contain"
            style={{width: 15, height: 30}}
          />
        </TouchableOpacity>
      </Header>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1}}>
        <RecipeDetailDescription
          setChecked={setChecked}
          boardId={1}
          recipeId={1}
          commentRefresh={commentRefresh}
          comment={comment}
          setComment={setComment}
          onRefresh={onRefresh}
          onRequest={onRequest}
          isLast={isLast}
          isLoading={isLoading}
        />
        {Checked ? (
          <CommentWriteComponent
            boardId={boardId}
            setCommentRefresh={setCommentRefresh}
            onRefresh={onRefresh}
            isAbsolute={false}
          />
        ) : undefined}
      </KeyboardAvoidingView>
      {Checked ? (
        <SafeAreaView edges={['bottom']} style={{backgroundColor: 'white'}} />
      ) : undefined}
    </>
  );
};

const RecipeDetailDescriptionContainer = styled.SafeAreaView`
  width: 100%;
  background: #f09311;
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  background: #f09311;
`;

export default RecipeDetailDescriptionScreen;

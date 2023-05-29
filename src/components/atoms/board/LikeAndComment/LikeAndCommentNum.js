import styled from 'styled-components/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import {toggleBoardLikeAction} from '../../../../services/BoardLike';
import {toggleBoardBookmark} from '../../../../services/BoardBookmark';
import {useFocusEffect} from '@react-navigation/native';

export default function LikeAndCommentNum({
  likeNum,
  isLiked,
  commentNum,
  isBookmarked,
  bookmarkable,
  boardId,
}) {
  const [bookmark, setBookmark] = useState(isBookmarked);
  const [liked, setLiked] = useState(false);
  const [activeLikeNum, setLikeNum] = useState(likeNum);

  const requestAboutLike = () => {
    toggleBoardLikeAction(boardId).then(res => {
      const data = JSON.parse(res.request._response);
      console.log(data.isLiked);
      setLiked(data.isLiked);
    });
  };
  const requestAboutBookmark = () => {
    toggleBoardBookmark(boardId).then(res => {
      const data = JSON.parse(res.request._response);
      setBookmark(data.isBookmarked);
    });
  };

  useEffect(() => {
    setBookmark(isBookmarked);
    setLiked(isLiked);
    setLikeNum(likeNum);
  }, [likeNum, isLiked, isBookmarked]);


  useLayoutEffect(() => {
    console.log('렌더링렌더링');
    if (isLiked && liked) {
      setLikeNum(likeNum);
    } else if (isLiked && !liked) {
      setLikeNum(likeNum - 1);
    } else if (!isLiked && liked) {
      setLikeNum(likeNum + 1);
    } else {
      setLikeNum(likeNum);
    }
  }, [liked, likeNum, boardId]);

  return (
    <LikeAndCommentNumContainer>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchContainer onPress={() => requestAboutLike()}>
          <LikeImg
            source={
              liked
                ? require('../../../../assets/images/LikeTrue.png')
                : require('../../../../assets/images/LikeFalse.png')
            }
          />
          <NumLabel>{activeLikeNum}</NumLabel>
        </TouchContainer>

        <CommentImg
          source={require('../../../../assets/images/BoardComment.png')}
        />
        <NumLabel>{commentNum}</NumLabel>
      </View>
      {bookmarkable ? (
        <TouchContainer onPress={() => requestAboutBookmark()}>
          {bookmark ? (
            <BookmarkImg
              source={require('../../../../assets/images/BookmarkTrue.png')}
            />
          ) : (
            <BookmarkImg
              source={require('../../../../assets/images/BookmarkFalse.png')}
            />
          )}
        </TouchContainer>
      ) : undefined}
    </LikeAndCommentNumContainer>
  );
}
const LikeAndCommentNumContainer = styled.View`
  height: 25px;
  gap: 10px;
  flex-direction: row;
  justify-content: space-between;
  margin: auto 0;
`;

const LikeImg = styled.Image`
  width: 32px;
  height: 32px;
  margin-top: -4px;
  margin-right: -5px;
`;

const CommentImg = styled.Image`
  width: 23px;
  height: 23px;
`;

const NumLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: -5px;
  color: #666666;
  font-family: Pretendard Variable;
`;

const TouchContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 10px;
`;

const BookmarkImg = styled.Image`
  width: 25px;
  height: 25px;
`;

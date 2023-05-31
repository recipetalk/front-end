import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const MiniBottomImageComponent = props => {
  return (
    <ImageContainer>
      <Default>
        <LikePart>
          <LikeImg source={require('../../assets/images/LikeFalse.png')} />
          <Label>{props.value?.likeCount}</Label>
        </LikePart>
        <CommentPart>
          <CommentImg
            source={require('../../assets/images/BoardComment.png')}
          />
          <Label>{props.value?.commentCount}</Label>
        </CommentPart>
      </Default>

      {props.isBookmark ? (
        <BookmarkImg
          source={require('../../assets/images/BookmarkFalse.png')}
        />
      ) : null}
    </ImageContainer>
  );
};

const Label = styled.Text`
  font-family: 'Pretendard Variable';
  font-weight: 400;
  color: #555555;
  font-size: 14px;
`;

const ImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Default = styled.View`
  display: flex;
  flex-direction: row;
`;

const LikePart = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
  align-items: center;
`;

const LikeImg = styled.Image`
  width: 15px;
  height: 15px;
`;

const CommentPart = styled.View`
  display: flex;
  flex-direction: row;
  gap: 3px;

  align-items: center;
`;

const CommentImg = styled.Image`
  width: 13px;
  height: 13px;
`;

const BookmarkImg = styled.Image`
  width: 15px;
  height: 15px;
`;
export default MiniBottomImageComponent;

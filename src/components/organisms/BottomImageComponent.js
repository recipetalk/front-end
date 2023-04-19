import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const BottomImageComponent = props => {
  return (
    <ImageContainer>
      <Default>
        <LikePart>
          <LikeImg source={require('../../assets/images/LikeFalse.png')} />
          <Text>{props.value?.likeCount}</Text>
        </LikePart>
        <CommentPart>
          <CommentImg
            source={require('../../assets/images/BoardComment.png')}
          />
          <Text>{props.value?.commentCount}</Text>
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
`;

const LikeImg = styled.Image`
  width: 30px;
  height: 30px;
`;

const CommentPart = styled.View`
  display: flex;
  flex-direction: row;
`;

const CommentImg = styled.Image`
  width: 25px;
  height: 25px;
`;

const BookmarkImg = styled.Image`
  width: 25px;
  height: 25px;
`;
export default BottomImageComponent;

import styled from 'styled-components/native';
import React from 'react';

export default function LikeAndCommentNum({likeNum, isLiked, commentNum}) {
  const LikeAndCommentNumContainer = styled.View`
    height: 25px;
    gap: 10px;
    flex-direction: row;

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
  `;

  const TouchContainer = styled.TouchableOpacity`
    flex-direction: row;
    gap: 10px;
  `;

  return (
    <LikeAndCommentNumContainer>
      <TouchContainer>
        <LikeImg
          source={
            isLiked
              ? require('../../../../assets/images/LikeTrue.png')
              : require('../../../../assets/images/LikeFalse.png')
          }
        />
        <NumLabel>{likeNum}</NumLabel>
      </TouchContainer>
      <TouchContainer>
        <CommentImg
          source={require('../../../../assets/images/BoardComment.png')}
        />
        <NumLabel>{commentNum}</NumLabel>
      </TouchContainer>
    </LikeAndCommentNumContainer>
  );
}

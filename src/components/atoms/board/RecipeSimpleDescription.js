import styled from 'styled-components/native';
import Hashtag from './hashtag/Hashtag';
import RecipeQuantityLabel from './RecipeQuantityLabel';
import CreatedDateLabel from '../CreatedDateLabel';
import LikeAndCommentNum from './LikeAndComment/LikeAndCommentNum';
import React from 'react';

export default function RecipeSimpleDescription({
  quantity,
  title,
  thumbnailUrl,
  hashtags,
  description,
  createdDate,
}) {
  const ThumbnailImg = thumbnailUrl !== '' ? styled.Image`` : styled.View``;

  const RecipeSimpleDescriptionContainer = styled.View`
    align-items: flex-start;
    padding: 0px;
    gap: 13px;

    width: 323px;
    height: 375px;

    margin: 0 auto;
  `;

  const TitleText = styled.Text`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -1px;
    color: #333333;
    margin-top: -12px;
  `;

  const Description = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;

    letter-spacing: 0px;

    margin-bottom: 7px;
    color: #666666;
  `;

  return (
    <RecipeSimpleDescriptionContainer>
      <RecipeQuantityLabel quantity={quantity} />
      <CreatedDateLabel createdDate={createdDate} />
      <TitleText>{title}</TitleText>
      <Description>{description}</Description>
      <Hashtag hashtags={hashtags} />
      <LikeAndCommentNum isLiked={true} commentNum={54} likeNum={546} />
    </RecipeSimpleDescriptionContainer>
  );
}

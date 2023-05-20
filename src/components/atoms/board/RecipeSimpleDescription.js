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
  description,
  createdDate,
  recipeId,
  boardId,
  navigation,
}) {
  const ThumbnailImg =
    thumbnailUrl !== undefined
      ? styled.Image`
          width: 100%;
          height: 170px;
          border: 1px solid black;
          border-radius: 8px;
        `
      : styled.View`
          width: 100%;
          height: 170px;
          border: 1px solid black;
          border-radius: 8px;
        `;

  return (
    <RecipeSimpleDescriptionContainer>
      <TouchContainer
        onPress={() =>
          navigation.push('RecipeDetailScreen', {
            boardId: boardId,
          })
        }>
        <ThumbnailImg />
        <ViewAndCreatedDateLabelContainer>
          <RecipeQuantityLabel quantity={quantity} />
          <CreatedDateLabel createdDate={createdDate} />
        </ViewAndCreatedDateLabelContainer>
        <TitleText>{title}</TitleText>
        <Description>{description}</Description>
      </TouchContainer>
      <LikeAndCommentNum isLiked={true} commentNum={54} likeNum={546} />
    </RecipeSimpleDescriptionContainer>
  );
}

const RecipeSimpleDescriptionContainer = styled.View`
  padding: 0px;
  width: 90%;
  height: 400px;
  margin: 0 auto;
`;

const TouchContainer = styled.TouchableOpacity`
  gap: 13px;
`;

const TitleText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -1px;
  color: #333333;
  margin-top: -9px;
  font-family: 'Pretendard Variable';
`;

const Description = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  letter-spacing: 0px;

  margin-bottom: 7px;
  color: #666666;
`;

const ViewAndCreatedDateLabelContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

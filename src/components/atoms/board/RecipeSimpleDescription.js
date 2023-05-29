import styled from 'styled-components/native';
import Hashtag from './hashtag/Hashtag';
import RecipeQuantityLabel from './RecipeQuantityLabel';
import CreatedDateLabel from '../CreatedDateLabel';
import LikeAndCommentNum from './LikeAndComment/LikeAndCommentNum';
import React from 'react';
import {View} from 'react-native';

export default function RecipeSimpleDescription({
  quantity,
  title,
  thumbnailUrl,
  description,
  createdDate,
  boardId,
  navigation,
  commentNum,
  likeNum,
  isLiked,
}) {
  return (
    <RecipeSimpleDescriptionContainer
      exist={thumbnailUrl != null && thumbnailUrl != ''}>
      <TouchContainer
        onPress={() =>
          navigation.push('RecipeDetailScreen', {
            boardId: boardId,
          })
        }>
        {thumbnailUrl != null && thumbnailUrl != '' ? (
          <ThumbnailImg source={{uri: thumbnailUrl}} />
        ) : undefined}
        <ViewAndCreatedDateLabelContainer>
          <RecipeQuantityLabel quantity={quantity} />
          <CreatedDateLabel createdDate={createdDate} />
        </ViewAndCreatedDateLabelContainer>
        <TitleText>{title}</TitleText>
        <Description>{description}</Description>
      </TouchContainer>
      <View style={{position: 'absolute', bottom: 10}}>
        <LikeAndCommentNum
          isLiked={isLiked}
          commentNum={commentNum}
          likeNum={likeNum}
          boardId={boardId}
        />
      </View>
    </RecipeSimpleDescriptionContainer>
  );
}

const ThumbnailImg = styled.Image`
  width: 100%;
  height: 170px;
  border-radius: 8px;
`;
const ThumbnailImgDummy = styled.View`
  width: 100%;
  height: 170px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const RecipeSimpleDescriptionContainer = styled.View`
  padding: 0px;
  width: 90%;
  height: ${props => (props.exist ? '400px' : '230px')};
  margin: 0 auto;
  position: relative;
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

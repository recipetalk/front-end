import React from 'react';
import styled from 'styled-components/native';
import BottomImageComponent from '../BottomImageComponent';
import LikeAndCommentNum from '../../atoms/board/LikeAndComment/LikeAndCommentNum';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FItem = props => {
  const navigation = useNavigation();
  return (
    <FItemContainer>
      <TouchableOpacity
        onPress={() =>
          navigation.push('RecipeDetailScreen', {
            boardId: props?.value?.board?.boardId,
          })
        }>
        {props?.value?.thumbnailUri != null &&
        props?.value?.thumbnailUri != '' ? (
          <FItemImage source={{uri: props?.value?.thumbnailUri}} />
        ) : (
          <FItemDummyImage />
        )}
        <Title>{props?.value?.board?.title}</Title>
        <Content>{props?.value?.description}</Content>
      </TouchableOpacity>
      <LikeAndCommentNum
        isLiked={props?.value?.board?.isLiked}
        commentNum={props?.value?.board?.commentCount}
        likeNum={props?.value?.board?.likeCount}
        boardId={props?.value?.board?.boardId}
        bookmarkable={true}
        isBookmarked={props?.value?.board?.isBookmarked}
      />
    </FItemContainer>
  );
};

const FItemContainer = styled.View``;

const FItemDummyImage = styled.View`
  width: 100%;
  height: 170px;

  border-radius: 8px;
  border: 1px solid black;
  margin: auto;
  margin-bottom: 8px;
`;

const FItemImage = styled.Image`
  width: 100%;
  height: 170px;

  border-radius: 8px;
  margin: auto;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Pretendard Variable';

  color: #333333;
  margin-bottom: 8px;
`;

const Content = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  color: #666666;
  margin-bottom: 13px;
`;

const TagContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const Tag = styled.View`
  width: 49px;
  height: 23px;
  padding: 3px 9px;
  background: #ffffff;
  border: 1px solid #f09311;
  border-radius: 40px;

  margin-bottom: 13px;
`;

const TagText = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

export default FItem;

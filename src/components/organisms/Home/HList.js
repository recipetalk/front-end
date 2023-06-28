import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BottomImageComponent from '../BottomImageComponent';
import {useNavigation} from '@react-navigation/native';
import MiniBottomImageComponent from '../MiniBottomImageComponent';

const HList = ({value, boardSort}) => {
  const navigation = useNavigation();
  return (
    <HListContainer
      onPress={() =>
        navigation.push(determineNavigation(boardSort), {
          boardId: value?.board.boardId,
          ingredientId: value?.ingredientId,
        })
      }>
      {value?.thumbnailUri != null && value?.thumbnailUri !== '' ? (
        <Thumbnail source={{uri: value.thumbnailUri}} />
      ) : (
        <DummyImage />
      )}
      <Title>{value.board?.title}</Title>
      <MiniBottomImageComponent
        isBookmark={false}
        value={{
          likeCount: value.board?.likeCount,
          commentCount: value.board?.commentCount,
        }}
      />
    </HListContainer>
  );
};
const HListContainer = styled.TouchableOpacity`
  margin-bottom: 16px;
`;

const determineNavigation = boardSort => {
  if (boardSort === 'RECIPE') {
    return 'RecipeDetailScreen';
  } else if (boardSort === 'TRIMMING') {
    return 'PrepDetail';
  } else if (boardSort === 'DESCRIPTION') {
    return 'Efficacy';
  }
};

const Thumbnail = styled.Image`
  width: 166px;
  height: 166px;

  border-radius: 5px;
  margin-bottom: 8px;
`;

const DummyImage = styled.View`
  width: 166px;
  height: 166px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';

  color: #666666;
  margin-bottom: 8px;
`;

export default memo(HList);

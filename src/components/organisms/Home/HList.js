import React from 'react';
import styled from 'styled-components/native';
import BottomImageComponent from '../BottomImageComponent';
import {useNavigation} from '@react-navigation/native';
import MiniBottomImageComponent from '../MiniBottomImageComponent';

const HList = props => {
  const navigation = useNavigation();
  return (
    <HListContainer
      onPress={() =>
        navigation.push(determineNavigation(props?.value?.board?.boardSort), {
          boardId: props?.value?.board?.boardId,
        })
      }>
      <Thumbnail />
      <Title>{props?.value?.board?.title}</Title>
      <MiniBottomImageComponent
        isBookmark={false}
        value={{
          likeCount: props?.value?.board?.likeCount,
          commentCount: props?.value?.board?.commentCount,
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

const Thumbnail = styled.View`
  width: 166px;
  height: 166px;
  border: 1px solid black;
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

export default HList;

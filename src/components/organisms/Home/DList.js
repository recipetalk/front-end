import styled from 'styled-components/native';
import React, {memo, useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import MiniBottomImageComponent from '../MiniBottomImageComponent';

const DList = props => {
  const navigation = useNavigation();
  const determineNav = useMemo(
    () => determineNavigation(props?.boardSort),
    [props?.boardSort],
  );

  const determineBoardId = useMemo(
    () =>
      props?.value?.boardId === undefined
        ? props?.value?.id
        : props?.value?.boardId,
    [props?.value?.id, props?.value?.boardId],
  );

  const mainDetermineBoardId = useMemo(
    () =>
      determineBoardId === undefined
        ? props?.value?.board?.boardId
        : determineBoardId,
    [props?.value?.board?.boardId, determineBoardId],
  );

  const determineIngredientId = useMemo(
    () =>
      props?.value?.ingredientId === undefined
        ? props?.ingredientId
        : props?.value?.ingredientId,
    [props?.value?.ingredientId, props.ingredientId],
  );

  const title = useMemo(
    () =>
      props?.value?.title === undefined
        ? props?.value?.board?.title
        : props?.value?.title,
    [props?.value?.board?.title, props?.value?.title],
  );

  return (
    <DListContainer
      onPress={() =>
        navigation.push(determineNav, {
          boardId: mainDetermineBoardId,
          ingredientId: determineIngredientId,
        })
      }>
      <ImagePart />

      <InfoPart>
        <Titie>{title}</Titie>
        <UserID>{props?.value?.description}</UserID>
        {props.value?.board?.commentCount !== undefined ? (
          <MiniBottomImageComponent
            value={props.value?.board}
            isBookmark={false}
          />
        ) : (
          <MiniBottomImageComponent value={props.value} isBookmark={false} />
        )}
      </InfoPart>
    </DListContainer>
  );
};

const determineNavigation = boardSort => {
  if (boardSort === 'RECIPE') {
    return 'RecipeDetailScreen';
  } else if (boardSort === 'TRIMMING') {
    return 'PrepDetail';
  } else if (boardSort === 'DESCRIPTION') {
    return 'Efficacy';
  }
};

const DListContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 18px;
  gap: 20px;
  border-bottom-width: 2px;
  border-bottom-color: #e1e1e1;
  background-color: #ffffff;
`;

const ImagePart = styled.Image`
  width: 98px;
  height: 98px;
  border-radius: 8px;
  background-color: gray;
  opacity: 0.3;
`;

const ImageDummyPart = styled.View`
  width: 98px;
  height: 98px;
  border-radius: 8px;
  background-color: gray;
  opacity: 0.3;
`;


const InfoPart = styled.View`
  width: 205px;
  height: 98px;
`;

const UserID = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  font-family: 'Pretendard Variable';

  color: #acacac;
  margin-bottom: 35px;
`;

const Titie = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Pretendard Variable';

  color: #333333;
  margin-bottom: 5px;
`;

const Content = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Pretendard Variable';

  color: #686868;
  margin-bottom: 10px;
`;

const ImageInfoPart = styled.View`
  display: flex;
  flex-direction: row;
`;

const LikePart = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 14px;
`;

const CommentPart = styled.View`
  display: flex;
  flex-direction: row;
`;
export default memo(DList);

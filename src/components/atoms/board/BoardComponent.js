import SimpleProfileWithDescription from '../profile/SimpleProfileWithDescription';
import RecipeSimpleDescription from './RecipeSimpleDescription';
import styled from 'styled-components/native';
import React, {useEffect} from 'react';
import {RecipeSortList} from '../../../category/recipe/RecipeSortList';

function BoardComponent({navigation, item}) {
  const BoardComponentContainer = styled.View`
    padding-top: 15px;
    gap: 15px;
    background-color: #ffffff;
  `;
  useEffect(() => {
    console.log(item.board);
  }, []);
  return (
    <BoardComponentContainer>
      <SimpleProfileWithDescription
        nickname={item?.board?.writer?.nickname}
        description={item?.board?.writer?.description}
        profileURI={item?.board?.writer?.profileImageURI}
        username={item?.board?.writer?.username}
        navigation={navigation}
        isFollowing={item?.board?.writer?.isFollowing}
      />
      <RecipeSimpleDescription
        title={
          `[${
            RecipeSortList[
              RecipeSortList.findIndex(data => data.value === item?.sort)
            ]?.label
          }] ` + item.board.title
        }
        description={item.description}
        quantity={item.quantity}
        boardId={item.board?.boardId}
        navigation={navigation}
        thumbnailUrl={item.thumbnailUri}
        isLiked={item.board?.isLiked}
        commentNum={item.board.commentCount}
        likeNum={item.board.likeCount}
        createdDate={item.board?.createdDate}
      />
    </BoardComponentContainer>
  );
}

export default React.memo(BoardComponent);

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import SimpleProfileWithDescription from '../profile/SimpleProfileWithDescription';
import LikeAndCommentNum from './LikeAndComment/LikeAndCommentNum';
import RecipeQuantityLabel from './RecipeQuantityLabel';
import ExpandableText from './ExpandableText';
import PrepOrderComponent from '../../organisms/PrepOrderComponent';
import {FlatList, Platform, RefreshControl, View} from 'react-native';
import {IngredientList} from '../../organisms/Recipe/IngredientList';
import {CommentListComponent} from '../../templates/board/CommentListComponent';
import RecipeOrderComponent from '../../organisms/RecipeOrderComponent';
import {
  getRecipe,
  getRecipeIngredients,
  getRecipeRow,
} from '../../../services/recipe/Recipe';
import {RecipeSortList} from '../../../category/recipe/RecipeSortList';
import {loadProfileToStorage} from '../../../services/repository/Profile';
import {loadLoginFromStorage} from '../../../services/repository/AutoLogin';
import {useDispatch} from 'react-redux';
import {
  setEditRecipeRows,
  setRecipeBoard,
  setRecipeIngredients,
} from '../../../store/RecipeEdit/TempRecipeEditInfoSlice';

export default function RecipeDetailDescription({
  navigation,
  setChecked,
  commentRefresh,
  comment,
  setComment,
  onRefresh,
  onRequest,
  isLoading,
  isLast,
  boardId,
  setMine,
  isEdit,
  setEdit,
  setWriter,
}) {
  const [isFirst, setFirst] = useState(false);
  const [isSecond, setSecond] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({description: ''});
  const [recipeIngredient, setRecipeIngredient] = useState([]);
  const [recipeRows, setRecipeRows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirst || isSecond) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [isFirst, isSecond]);

  useEffect(() => {
    //RecipeInfo
    getRecipe(boardId).then(async res => {
      const data = JSON.parse(res.request._response);
      setRecipeInfo(() => data);
      const loginInfo = await loadLoginFromStorage();
      console.log(data);
      setMine(loginInfo.username === data?.board?.writer?.username);
      setWriter(data?.board?.writer?.username);
    });
    //RecipeIngredient
    getRecipeIngredients(boardId)
      .then(res => {
        const data = JSON.parse(res.request._response);

        setRecipeIngredient(() => data);
      })
      .catch(err => console.log(err.response));

    //RecipeRow
    getRecipeRow(boardId).then(res => {
      const data = JSON.parse(res.request._response);
      console.log(data);
      setRecipeRows(() => data);
    });
  }, []);

  useEffect(() => {
    if (isEdit) {
      const recipeBoardData = {
        title: recipeInfo.board.title,
        description: recipeInfo.description,
        thumbnail: {uri: recipeInfo.thumbnailUri},
        quantity: recipeInfo.quantity,
        level: recipeInfo.level,
        sort: recipeInfo.sort,
        time: recipeInfo.durationTime,
        situationCategory: recipeInfo.situationCategory,
        recipeId: recipeInfo.board.boardId,
      };

      const recipeIngredientData = recipeIngredient.map(data => ({
        ingredientId: data.ingredientId,
        ingredientName: data.name,
        quantity: data.quantity,
        editable: false,
      }));

      const recipeRowData = recipeRows.map(data => ({
        id: data.seqNum,
        description: data.description,
        photo: {uri: data.imgUri},
        repoId: data.id,
      }));

      dispatch(setRecipeBoard(recipeBoardData));
      dispatch(setRecipeIngredients(recipeIngredientData));
      dispatch(setEditRecipeRows(recipeRowData));
      navigation.navigate('RecipeEdit');
      setEdit(false);
    }
  }, [isEdit]);

  if(recipeInfo?.board == null){
    return null;
  }

  return (
    <RecipeDetailDescriptionContainer>
      {recipeInfo?.thumbnailUri != null && recipeInfo?.thumbnailUri !== '' ? (
        <ThumbnailImg source={{uri: recipeInfo.thumbnailUri}} />
      ) : undefined}
      <SimpleProfileWithDescriptionContainer>
        <SimpleProfileWithDescription
          nickname={recipeInfo?.board?.writer?.nickname}
          description={recipeInfo?.board?.writer?.description}
          navigation={navigation}
          username={recipeInfo?.board?.writer?.username}
          profileURI={recipeInfo?.board?.writer?.profileImageURI}
        />
      </SimpleProfileWithDescriptionContainer>
      <DescriptionDetailContainer>
        <TitleContainer>
          <Title>
            {`[${
              RecipeSortList[
                RecipeSortList.findIndex(data => data.value === recipeInfo.sort)
              ]?.label
            }] ` + recipeInfo?.board?.title}
          </Title>
          <RecipeQuantityLabel quantity={recipeInfo?.quantity} />
        </TitleContainer>
        <ExpandableText text={recipeInfo?.description} />
        {/*<Hashtag hashtags={['#한식', '#한식', '#한식']} />*/}
        <LikeAndCountNumContainer>
          <LikeAndCommentNum
            likeNum={recipeInfo.board.likeCount}
            commentNum={recipeInfo.board.commentCount}
            bookmarkable={true}
            isBookmarked={recipeInfo.board.isBookmarked}
            isLiked={recipeInfo.board.isLiked}
            boardId={recipeInfo.board.boardId}
          />
        </LikeAndCountNumContainer>
      </DescriptionDetailContainer>
      <NavigationContainer>
        <NavigationBox>
          <NavigationButton
            onPress={() => {
              setFirst(!isFirst);
              if (!isFirst && isSecond) {
                setSecond(false);
              }
            }}>
            <NavigationLabel value={isFirst}>준비재료</NavigationLabel>
          </NavigationButton>
        </NavigationBox>
        <NavigationBox>
          <NavigationButton
            onPress={() => {
              setSecond(!isSecond);
              if (isFirst && !isSecond) {
                setFirst(false);
              }
            }}>
            <NavigationLabel value={isSecond}>요리모드</NavigationLabel>
          </NavigationButton>
        </NavigationBox>
      </NavigationContainer>

      {isFirst ? (
        <View>
          <IngredientList data={recipeIngredient} />
          <GoToIngredient>
            <GoToIngredientTitle>재료 준비가 됐나요?</GoToIngredientTitle>
            <GoToIngredientButton
              onPress={() => navigation.navigate('IngredientsHome')}>
              <GoToIngredientButtonLabel>
                내 냉장고 보기
              </GoToIngredientButtonLabel>
            </GoToIngredientButton>
          </GoToIngredient>
        </View>
      ) : undefined}

      {isSecond ? (
        <PrepOrderContainer>
          <OrderTitle>조리 순서</OrderTitle>
          {recipeRows.map(i => {
            return <RecipeOrderComponent value={i} datas={recipeRows} />;
          })}
        </PrepOrderContainer>
      ) : undefined}

      {!isSecond && !isFirst ? (
        <CommentListComponent
          isReply={false}
          boardId={boardId}
          comment={comment}
          setComment={setComment}
          onRefresh={onRefresh}
          isLast={isLast}
          onRequest={onRequest}
          isLoading={isLoading}
          commentRefresh={commentRefresh}
        />
      ) : undefined}
    </RecipeDetailDescriptionContainer>
  );
}
const GoToIngredientTitle = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #a0a0a0;
`;

const GoToIngredientButton = styled.TouchableOpacity``;

const GoToIngredientButtonLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-decoration-line: underline;
  color: #f09311;
`;

const GoToIngredient = styled.View`
  width: 100%;
  height: 220px;
  background: #ffffff;
  align-items: center;
  padding-top: 30px;
  gap: 10px;
  border-top-width: 4px;
  border-top-color: #e5e5e5;
`;

const NavigationContainer = styled.View`
  flex-direction: row;
  gap: 1px;
  margin-bottom: 1px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const NavigationBox = styled.View`
  width: 50%;
  height: 48px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const NavigationButton = styled.TouchableOpacity``;

const NavigationLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: ${props => (props.value ? '#F09311' : '#333333')};
`;

const RecipeDetailDescriptionContainer = props => {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListEmptyComponent={null}
      keyExtractor={() => {}}
      ListHeaderComponent={<>{props.children}</>}
      onRefresh={props.onRefresh}
      refreshing={props.commentRefresh}
    />
  );
};

const ThumbnailImg = styled.Image`
  height: 360px;
`;

const SimpleProfileWithDescriptionContainer = styled.View`
  background: #ffffff;
  margin-bottom: 7px;
  padding-top: 13px;
  padding-bottom: 13px;
  border-bottom-width: 4px;
  border-bottom-color: #e5e5e5;
`;

const TitleContainer = styled.View`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: ${Platform.OS === 'ios' ? '500' : '700'};
  font-size: 24px;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const DescriptionDetailContainer = styled.View`
  background: #ffffff;
  width: 100%;
  margin: 0 auto 1px auto;
  gap: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const LikeAndCountNumContainer = styled.View`
  margin-bottom: 15px;
  margin-top: 15px;
`;

const OrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  margin-top: 18px;
  font-family: 'Pretendard Variable';
  color: #666666;
  padding-left: 5%;
`;
const PrepOrderContainer = styled.View`
  background: #ffffff;
  gap: 20px;
  padding-bottom: 70px;
  flex: 1;
`;

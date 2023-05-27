import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import {
  getEfficacy,
  getIngredientsPrepDetail,
} from '../../../services/Ingredients';
import ExpandableText from '../../atoms/board/ExpandableText';
import Line from '../../atoms/Line';
import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import BottomImageComponent from '../../organisms/BottomImageComponent';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import PrepOrderComponent from '../../organisms/PrepOrderComponent';
import {CommentListComponent} from '../board/CommentListComponent';
import {getParentComment} from '../../../services/Comment';
import {CommentWriteComponent} from '../../organisms/comment/CommentWriteComponent';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';
import LikeAndCommentNum from '../../atoms/board/LikeAndComment/LikeAndCommentNum';

const PrepDetailComponent = () => {
  const router = useRoute();

  const [efficacyInfo, setEfficacyInfo] = useState(null);
  const [detailInfo, setDetailInfo] = useState(null);
  const [isClicked, setClicked] = useState(false);
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentPagingNum, setCommentPagingNum] = useState(0);
  const [isLast, setLast] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getIngredientsPrepDetail(router.params.boardId)
      .then(res => {
        const data = JSON.parse(res.request._response);

        setDetailInfo(() => data);
        console.log(data);
        getEfficacy(data.ingredient.ingredientId)
          .then(res => {
            setEfficacyInfo(res.data);
          })
          .catch(error => console.error(error.response));
      })
      .catch(error => console.error(error.response));
  }, [router.params.boardId]);

  useEffect(() => {
    getParentComment(router.params.boardId, 0).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(data.content);
      setCommentPagingNum(1);
      setLast(data.last);
    });
  }, [router.params.boardId]);

  const onRefresh = async () => {
    setCommentRefresh(true);
    await getParentComment(router.params.boardId, 0).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(() => data.content);
      setCommentPagingNum(() => 1);
      setLast(() => data.last);
      setCommentRefresh(false);
    });
  };

  const onRequest = async () => {
    setLoading(() => true);
    await getParentComment(router.params.boardId, commentPagingNum).then(
      res => {
        const data = JSON.parse(res.request._response);
        setComment(comment => comment.concat(data.content));
        setCommentPagingNum(num => num + 1);
        setLast(() => data.last);
        setLoading(() => false);
      },
    );
  };

  if (efficacyInfo === null || detailInfo === null) {
    return null;
  }

  return (
    <>
      <Container>
        <IngredientsHeader
          routerInfo={router.params.ingredientId}
          title="손질법"
          isTitleOnly={false}
          btnTextValue="수정"
          screen="PrepRegister"
        />
        <IngredientsInfo
          ingredientName={efficacyInfo.ingredientName}
          thumbnailURI={detailInfo.thumbnailURI}
        />
        <Line />

        <PrepDetailDescriptionContainer>
          <SimpleProfileWithDescriptionContainer>
            <SimpleProfileWithDescription
              nickname={detailInfo.boardDTO.writer.nickname}
              description={''}
              username={detailInfo.boardDTO.writer.username}
              profileURI={detailInfo.boardDTO.writer.profileImageURI}
            />
          </SimpleProfileWithDescriptionContainer>
          <Line />

          <DescriptionDetailContainer>
            <TitleContainer>
              <Title>{detailInfo.boardDTO.title}</Title>
            </TitleContainer>
            <ExpandableText
              text={
                detailInfo.description === null ? '' : detailInfo.description
              }
            />
            <LikeAndCountNumContainer>
              <LikeAndCommentNum
                likeNum={detailInfo.boardDTO.likeCount}
                commentNum={detailInfo.boardDTO.commentCount}
                bookmarkable={true}
                isBookmarked={detailInfo.boardDTO.isBookmarked}
                isLiked={detailInfo.boardDTO.isLiked}
                boardId={detailInfo.boardDTO.boardId}
              />
            </LikeAndCountNumContainer>
          </DescriptionDetailContainer>
          <Line />
          <NavigationContainer>
            <NavigationBox>
              <NavigationButton
                onPress={() => {
                  setClicked(value => !value);
                }}>
                <NavigationLabel value={isClicked}>손질순서</NavigationLabel>
              </NavigationButton>
            </NavigationBox>
          </NavigationContainer>
          {isClicked ? (
            <PrepOrderContainer>
              <PrepOrderTitle>손질 순서</PrepOrderTitle>
              {detailInfo.trimmingRows.map((item, index) => {
                return <PrepOrderComponent value={item} key={index} />;
              })}
            </PrepOrderContainer>
          ) : (
            <>
              <CommentListComponent
                boardId={router.params.boardId}
                comment={comment}
                isReply={false}
                setComment={setComment}
                onRefresh={onRefresh}
                isLast={isLast}
                onRequest={onRequest}
                isLoading={isLoading}
                commentRefresh={commentRefresh}
              />
            </>
          )}
        </PrepDetailDescriptionContainer>
      </Container>
      {!isClicked ? (
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}>
          <CommentWriteComponent
            boardId={router?.params?.boardId}
            setCommentRefresh={setCommentRefresh}
            onRefresh={onRefresh}
            isAbsolute={false}
          />
        </KeyboardAvoidingView>
      ) : undefined}
    </>
  );
};
const ThumbnailImg = styled.Image`
  height: 360px;
`;

const Container = styled.View`
  width: 100%;
  flex: 1;
`;

const SimpleProfileWithDescriptionContainer = styled.View`
  background: #ffffff;
  margin: 17px 0 17px 0;
`;

const TitleContainer = styled.View`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 500;
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
`;
const PrepOrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  font-family: 'Pretendard Variable';

  color: #333333;
  padding: 18px;
`;

const PrepOrderContainer = styled.View`
  margin-bottom: 150px;
`;

const NavigationBox = styled.View`
  width: 100%;
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

const NavigationContainer = styled.View`
  flex-direction: row;
  gap: 1px;
  margin-bottom: 1px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const PrepDetailDescriptionContainer = props => {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListEmptyComponent={null}
      keyExtractor={() => {}}
      ListHeaderComponent={<>{props.children}</>}
    />
  );
};

export default PrepDetailComponent;

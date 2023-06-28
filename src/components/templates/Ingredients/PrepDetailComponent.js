import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {
  deleteIngredientsPrep,
  getEfficacy,
  getIngredientsPrepDetail,
} from '../../../services/Ingredients';
import ExpandableText from '../../atoms/board/ExpandableText';
import Line from '../../atoms/Line';
import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import PrepOrderComponent from '../../organisms/PrepOrderComponent';
import {CommentListComponent} from '../board/CommentListComponent';
import {getParentComment} from '../../../services/Comment';
import {CommentWriteComponent} from '../../organisms/comment/CommentWriteComponent';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';
import LikeAndCommentNum from '../../atoms/board/LikeAndComment/LikeAndCommentNum';
import {useDispatch} from 'react-redux';
import {__getPrepDetail} from '../../../store/Ingredients/PrepSlice';
import {loadLoginFromStorage} from '../../../services/repository/AutoLogin';
import AlertYesNoButton from '../../molecules/AlertYesNoButton';
import {RecipeRemoveRequest} from '../../../services/recipe/Recipe';
import {reportPreps, reportRecipe} from '../../../services/Report';
import {requestRegisterBlockedUser} from '../../../services/MyPage';
import {OptionModalChildImage} from '../../organisms/OptionModalChildImage';
import {useToast} from 'react-native-toast-notifications';

const PrepDetailComponent = () => {
  const router = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [efficacyInfo, setEfficacyInfo] = useState(null);
  const [detailInfo, setDetailInfo] = useState(null);
  const [isClicked, setClicked] = useState(false);
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentPagingNum, setCommentPagingNum] = useState(0);
  const [isLast, setLast] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [sameUser, setSameUser] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');
  const [checkedItem, setCheckedItem] = useState(null);
  const toast = useToast();

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

  useEffect(() => {
    dispatch(__getPrepDetail(router.params.boardId));
  }, [dispatch, router.params.boardId]);

  useEffect(() => {
    if (checkedItem !== null) {
      checkedItem.onPress();
    }
  }, [checkedItem]);

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

  const checkSameUser = useCallback(async () => {
    const loadUsername = (await loadLoginFromStorage()).username;

    if (loadUsername === detailInfo.boardDTO.writer.username) {
      setSameUser(true);
      return;
    }

    setSameUser(false);
  }, [detailInfo]);

  useEffect(() => {
    checkSameUser();
  }, [checkSameUser]);

  const items = sameUser
    ? [
        {
          label: '삭제하기',
          value: 'delete',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 삭제하시겠습니까?');
            setAlertText('삭제하면 복구가 불가능합니다.');
          },
        },
        {
          label: '수정하기',
          value: 'commentReply',
          onPress: () => {
            navigation.navigate('PrepRegister');
          },
        },
      ]
    : [
        {
          label: '게시글 신고하기',
          value: 'report',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 신고하시겠습니까?');
            setAlertText('신중히 신고 해주시면 감사하겠습니다.');
          },
        },
        {
          label: '작성자 차단하기',
          value: 'block',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 차단하시겠습니까?');
            setAlertText(
              '차단하게 되면 글 및 덧글, 프로필 모두 보이지 않게 됩니다.',
            );
          },
        },
      ];

  if (efficacyInfo === null || detailInfo === null) {
    return null;
  }
  /*
<IngredientsHeader
          title="손질법"
          isTitleOnly={false}
          btnTextValue="수정"
          screen="PrepRegister"
          sameUser={sameUser}
        />
 */

  return (
    <>
      <Container>
        <Header isTransparent={false}>
          <HeaderTitleContainer>
            <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
              <BackBtn onPress={() => navigation.goBack()}>
                <Back
                  source={require('../../../assets/images/Back.png')}
                  resizeMode={'contain'}
                />
              </BackBtn>
              <HeaderTitle isTransparent={false}>{'손질법'}</HeaderTitle>
            </View>
            <OptionModalChildImage
              items={items}
              setCheckedItem={setCheckedItem}>
              <Image
                source={require('../../../assets/images/More.png')}
                resizeMode="contain"
              />
            </OptionModalChildImage>
          </HeaderTitleContainer>
        </Header>
        <IngredientsInfo
          isEdit={false}
          ingredientName={efficacyInfo.ingredientName}
          thumbnail={detailInfo.thumbnailURI}
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
                return (
                  <PrepOrderComponent
                    value={item}
                    key={index}
                    items={detailInfo.trimmingRows}
                  />
                );
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
      {isAlert ? (
        <AlertYesNoButton
          title={alertTitle}
          setAlert={setAlert}
          yesButtonText={checkedItem.label}
          text={alertText}
          onPress={() => {
            if (checkedItem.value === 'delete') {
              deleteIngredientsPrep(router.params.boardId).then(() => {
                setAlert(false);
                navigation.pop();
                setTimeout(
                  () => toast.show('게시글이 정상적으로 삭제되었습니다.'),
                  300,
                );
              });
            } else if (checkedItem.value === 'report') {
              reportPreps(router.params.boardId).then(() => {
                setAlert(false);
                setTimeout(
                  () => toast.show('게시글이 정상적으로 신고되었습니다.'),
                  300,
                );
              });
            } else if (checkedItem.value === 'block') {
              requestRegisterBlockedUser(
                detailInfo.boardDTO.writer.username,
              ).then(() => {
                setAlert(false);
                navigation.pop();
                setTimeout(
                  () => toast.show('작성자 차단이 완료되었습니다.'),
                  300,
                );
              });
            }
          }}
        />
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
  ${Platform.select({
    android: 'border-right-width:1px; border-right-color:#d8d8d8;',
    ios: undefined,
  })}
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
  ${Platform.select({
    ios: 'box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);',
    android:
      'border-top-width: 1px; border-bottom-width: 1px; border-color: #d8d8d8',
  })}
`;

const Header = styled.View`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
  background-color: ${props => (props.isTransparent ? 'black' : '#ffffff')};
  opacity: ${props => (props.isTransparent ? '0.8' : '1.0')};
`;

const HeaderTitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

const BackBtn = styled.TouchableOpacity``;

const Back = styled.Image`
  width: 20px;
  height: 20px;
`;

const HeaderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: ${props => (props.isTransparent ? '#ffffff' : '#333333')};
  font-family: 'Pretendard Variable';
`;

const BtnValueText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: ${props => (props.isTransparent ? '#ffffff' : '#f09311')};
  font-family: 'Pretendard Variable';
`;

const BtnBtn = styled.TouchableOpacity``;

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

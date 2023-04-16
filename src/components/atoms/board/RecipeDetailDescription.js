import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import SimpleProfileWithDescription from '../profile/SimpleProfileWithDescription';
import LikeAndCommentNum from './LikeAndComment/LikeAndCommentNum';
import RecipeQuantityLabel from './RecipeQuantityLabel';
import ExpandableText from './ExpandableText';
import PrepOrderComponent from '../../organisms/PrepOrderComponent';
import {Platform, RefreshControl, View} from 'react-native';
import {IngredientList} from '../../organisms/Recipe/IngredientList';
import {CommentListComponent} from '../../templates/board/CommentListComponent';

const Ingredients = [
  {
    name: '마늘',
    quantity: '한 쪽',
    isHas: true,
  },
  {
    name: '마늘',
    quantity: '한 쪽',
    isHas: true,
  },
  {
    name: '김치',
    quantity: '한 포기',
    isHas: false,
  },
  {
    name: '소금',
    quantity: '한 티스푼',
    isHas: true,
  },
  {
    name: '마늘',
    quantity: '한 쪽',
    isHas: false,
  },
  {
    name: '마늘',
    quantity: '한 쪽',
    isHas: false,
  },
  {
    name: '마늘',
    quantity: '한 쪽',
    isHas: false,
  },
];

export default function RecipeDetailDescription({
  navigation,
  setChecked,
  commentRefresh,
  comment,
  setComment,
  onRefresh,
}) {
  const [isFirst, setFirst] = useState(false);
  const [isSecond, setSecond] = useState(false);

  useEffect(() => {
    if (isFirst || isSecond) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [isFirst, isSecond]);

  return (
    <RecipeDetailDescriptionContainer
      refreshControl={
        <RefreshControl
          refreshing={commentRefresh}
          onRefresh={() => onRefresh()}
        />
      }>
      <ThumbnailImg />
      <SimpleProfileWithDescriptionContainer>
        <SimpleProfileWithDescription
          nickname={'사용자아이디0000'}
          description={'4아이 엄마~^^'}
        />
      </SimpleProfileWithDescriptionContainer>
      <DescriptionDetailContainer>
        <TitleContainer>
          <Title>[찌개요리]자취 8년차 된장찌개 맛있게 끓이는 법</Title>
          <RecipeQuantityLabel quantity={4} />
        </TitleContainer>
        <ExpandableText
          text={`생각해보니 결혼한 지 5년이 넘었는데도 친정 부모님께 제대로 된 요리하나 만들어드린 적이 없는 무심함 큰딸 이더라구요.
"부모님이 집에 오셔도 오랜만에 엄마 밥"
생각해보니 결혼한 지 5년이 넘었는데도 친정 부모님께 제대로 된 요리하나 만들어드린 적이 없는 무심함 큰딸 이더라구요.
"부모님이 집에 오셔도 오랜만에 엄마 밥"`}
        />
        {/*<Hashtag hashtags={['#한식', '#한식', '#한식']} />*/}
        <LikeAndCountNumContainer>
          <LikeAndCommentNum likeNum={545} commentNum={545} />
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
          <IngredientList data={Ingredients} />
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
          {[1, 2, 3, 4, 5].map(i => {
            return <PrepOrderComponent num={i} key={i} />;
          })}
        </PrepOrderContainer>
      ) : undefined}
      {!isSecond && !isFirst ? (
        <CommentListComponent
          isReply={false}
          boardId={1}
          comment={comment}
          setComment={setComment}
          onRefresh={onRefresh}
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

const RecipeDetailDescriptionContainer = styled.ScrollView`
  height: 100%;
`;

const ThumbnailImg = styled.View`
  height: 360px;
  border: 1px solid black;
`;

const SimpleProfileWithDescriptionContainer = styled.View`
  background: #ffffff;
  margin-bottom: 7px;
  padding-top: 13px;
  padding-bottom: 13px;
`;

const TitleContainer = styled.View`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 30px;
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
`;

import React from 'react';
import styled from 'styled-components/native';
import SimpleProfileWithDescription from '../profile/SimpleProfileWithDescription';
import Hashtag from './hashtag/Hashtag';
import LikeAndCommentNum from './LikeAndComment/LikeAndCommentNum';
import RecipeQuantityLabel from './RecipeQuantityLabel';
import ExpandableText from './ExpandableText';

export default function RecipeDetailDescription({navigation}) {
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

    /* or 31px */

    /* #333333 */

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
    margin-top: 10px;
    margin-bottom: 15px;
  `;

  return (
    <RecipeDetailDescriptionContainer>
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
        <Hashtag hashtags={['#한식', '#한식', '#한식']} />
        <LikeAndCountNumContainer>
          <LikeAndCommentNum likeNum={545} commentNum={545} />
        </LikeAndCountNumContainer>
      </DescriptionDetailContainer>
    </RecipeDetailDescriptionContainer>
  );
}

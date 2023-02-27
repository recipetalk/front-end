import React from 'react';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import SimpleProfileWithDescription from '../profile/SimpleProfileWithDescription';
import Hashtag from './hashtag/Hashtag';
import LikeAndCommentNum from './LikeAndComment/LikeAndCommentNum';
import RecipeQuantityLabel from './RecipeQuantityLabel';

export default function RecipeDetailDescription() {
  const Header = styled.View`
    width: 100%;
    height: 50px;
    background: #f09311;
  `;

  const RecipeDetailDescriptionContainer = styled.ScrollView`
    border: 1px solid red;
    height: 100%;
  `;

  const ThumbnailImg = styled.View`
    height: 360px;
    border: 1px solid black;
  `;

  const SimpleProfileWithDescriptionContainer = styled.View`
    background: #ffffff;
  `;

  const TitleContainer = styled.View`
    width: 100%;
    display: flex;
    gap: 10px;
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
    border: 1px solid green;
    width: 100%;
    margin: 0 auto;
    gap: 10px;
    padding: 10px;
  `;

  const LikeAndCountNumContainer = styled.View`
    margin-top: 10px;
    margin-bottom: 15px;
  `;

  return (
    <RecipeDetailDescriptionContainer>
      <Header />
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
        <Hashtag hashtags={['#한식', '#한식', '#한식']} />
        <LikeAndCountNumContainer>
          <LikeAndCommentNum likeNum={545} commentNum={545} />
        </LikeAndCountNumContainer>
      </DescriptionDetailContainer>
    </RecipeDetailDescriptionContainer>
  );
}

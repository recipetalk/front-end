import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {
  getEfficacy,
  getIngredientsPrepDetail,
} from '../../../services/Ingredients';
import ExpandableText from '../../atoms/board/ExpandableText';
import Line from '../../atoms/Line';
import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import BottomImageComponent from '../../organisms/BottomImageComponent';
import CommentComponent from '../../organisms/CommentComponent';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';
import PrepOrderComponent from '../../organisms/PrepOrderComponent';

const PrepDetailComponent = () => {
  const router = useRoute();

  const [efficacyInfo, setEfficacyInfo] = useState(null);
  const [detailInfo, setDetailInfo] = useState(null);

  useEffect(() => {
    getEfficacy(router.params.ingredientId)
      .then(res => {
        setEfficacyInfo(res.data);
      })
      .catch(error => console.error(error.response));
  }, [router.params.ingredientId]);

  useEffect(() => {
    getIngredientsPrepDetail(router.params.boardId)
      .then(res => {
        setDetailInfo(res.data);
      })
      .catch(error => console.error(error.response));
  }, [router.params.boardId]);

  if (efficacyInfo === null || detailInfo === null) {
    return null;
  }

  return (
    <>
      <IngredientsHeader
        routerInfo={router.params.ingredientId}
        title="손질법"
        isTitleOnly={false}
        btnTextValue="수정"
        screen="PrepRegister"
      />
      <IngredientsInfo ingredientName={efficacyInfo.ingredientName} />
      <Line />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SimpleProfileWithDescriptionContainer>
          <SimpleProfileWithDescription
            nickname={detailInfo.boardDTO.writer.nickname}
            description={''}
          />
        </SimpleProfileWithDescriptionContainer>
        <Line />

        <DescriptionDetailContainer>
          <TitleContainer>
            <Title>{detailInfo.boardDTO.title}</Title>
          </TitleContainer>
          <ExpandableText
            text={detailInfo.description === null ? '' : detailInfo.description}
          />
          <LikeAndCountNumContainer>
            <BottomImageComponent isBookmark={true} />
          </LikeAndCountNumContainer>
        </DescriptionDetailContainer>
        <Line />

        <CommentComponent />
        <Line />

        <PrepOrderContainer>
          <PrepOrderTitle>손질 순서</PrepOrderTitle>

          {detailInfo.trimmingRows.map((item, index) => {
            return <PrepOrderComponent value={item} key={index} />;
          })}
        </PrepOrderContainer>
      </ScrollView>
    </>
  );
};

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
export default PrepDetailComponent;

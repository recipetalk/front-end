import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import ExpandableText from '../../atoms/board/ExpandableText';
import Line from '../../atoms/Line';
import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import BottomImageComponent from '../../organisms/BottomImageComponent';
import CommentComponent from '../../organisms/CommentComponent';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';
import PrepOrderComponent from '../../organisms/PrepOrderComponent';

const PrepDetailComponent = () => {
  const dummy = {
    description: '식재료 손질법 설명',
    trimmingRows: [
      {
        description: '식재료 손질순서 1번에 대한 1번 사진 설명',
        imgUri:
          'https://recipe-prod-s3.s3.ap-northeast-2.amazonaws.com/img/ingredient/trimming/row/0f9cac8c-078a-49b2-8929-daa9bc384dc0forImg.jpg',
        trimmingSeq: 1,
        trimmingSubSeq: 1,
      },
      {
        description: '식재료 손질순서 1번에 대한 2번 사진 설명',
        imgUri:
          'https://recipe-prod-s3.s3.ap-northeast-2.amazonaws.com/img/ingredient/trimming/row/6bcdcf11-834a-4516-85d7-863bd862e200forImg.jpg',
        trimmingSeq: 1,
        trimmingSubSeq: 2,
      },
      {
        description: '식재료 손질순서 2번에 대한 1번 사진 설명',
        imgUri:
          'https://recipe-prod-s3.s3.ap-northeast-2.amazonaws.com/img/ingredient/trimming/row/129dafac-9b5d-426e-9a47-b8ace32b5d0bforImg.jpg',
        trimmingSeq: 2,
        trimmingSubSeq: 1,
      },
    ],
  };

  return (
    <>
      <IngredientsHeader
        title="손질법"
        isTitleOnly={false}
        btnTextValue="수정"
        screen="PrepRegister"
      />
      <IngredientsInfo />
      <Line />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SimpleProfileWithDescriptionContainer>
          <SimpleProfileWithDescription
            nickname={'사용자아이디0000'}
            description={'4아이 엄마~^^'}
          />
        </SimpleProfileWithDescriptionContainer>
        <Line />

        <DescriptionDetailContainer>
          <TitleContainer>
            <Title>주부 100단 마늘 쉽게 손질하기</Title>
          </TitleContainer>
          <ExpandableText
            text={`생각해보니 결혼한 지 5년이 넘었는데도 친정 부모님께 제대로 된 요리하나 만들어드린 적이 없는 무심함 큰딸 이더라구요.
"부모님이 집에 오셔도 오랜만에 엄마 밥"
생각해보니 결혼한 지 5년이 넘었는데도 친정 부모님께 제대로 된 요리하나 만들어드린 적이 없는 무심함 큰딸 이더라구요.
"부모님이 집에 오셔도 오랜만에 엄마 밥"`}
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

          {dummy.trimmingRows.map((item, index) => {
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

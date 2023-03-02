import React from 'react';
import styled from 'styled-components/native';
import Line from '../../components/atoms/Line';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../components/organisms/Ingredients/IngredientsInfo';
import SimpleProfileWithDescription from '../../components/atoms/profile/SimpleProfileWithDescription';
import ExpandableText from '../../components/atoms/board/ExpandableText';
import BottomImageComponent from '../../components/organisms/BottomImageComponent';
import CommentComponent from '../../components/organisms/CommentComponent';
import {ScrollView} from 'react-native';
import PrepOrderComponent from '../../components/organisms/PrepOrderComponent';

const PrepDetailScreen = () => {
  return (
    <PrepDetailScreenContainer>
      <IngredientsHeader
        title="손질법"
        isTitleOnly={false}
        btnTextValue="수정"
      />
      <IngredientsInfo />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Line />
        <SimpleProfileWithDescriptionContainer>
          <SimpleProfileWithDescription
            nickname={'사용자아이디0000'}
            description={'4아이 엄마~^^'}
          />
          <Line />
        </SimpleProfileWithDescriptionContainer>
        <DescriptionDetailContainer>
          <TitleContainer>
            <Title>주부 100단 마늘 쉽게 손질하기 </Title>
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
          <OrderTitle>손질 순서</OrderTitle>
          {[1, 2, 3, 4, 5].map(i => {
            return <PrepOrderComponent num={i} key={i} />;
          })}
        </PrepOrderContainer>
      </ScrollView>
    </PrepDetailScreenContainer>
  );
};

const PrepDetailScreenContainer = styled.SafeAreaView`
  background-color: #ffffff;
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

  color: #333333;
  padding: 18px;
`;
const PrepOrderContainer = styled.View`
  margin-bottom: 150px;
`;
export default PrepDetailScreen;

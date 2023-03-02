import React from 'react';
import styled from 'styled-components/native';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../components/organisms/Ingredients/IngredientsInfo';

const EfficacyScreen = () => {
  return (
    <EfficacyScreenContainer>
      <IngredientsHeader
        title="효능 및 정보"
        isTitleOnly={false}
        btnTextValue="수정"
        screen="EfficacyEdit"
      />
      <IngredientsInfo isEdit={false} />
      <EfficacyInfo>
        <EfficacyText>효능</EfficacyText>
        <EfficacyContent>
          일상에서도 매우 흔하게 접할 수 있는 향신작물로, 특유의 차가운 매운
          맛과 담백한 맛, 그리고 의외의 굉장한 단맛[7] 때문에, 마늘은 그 자체로
          묘한 중독성이 있다. 여기에 소금만 들어가면 매운 단짠단짠이 되고,
          기름기를 추가하면 기름지고 맵고 달고 짠 완벽한 맛이 탄생하는 신비한
          작물이다.이런 향신료가 과거 기준으로도 비교적 매우 흔하게 쉽게
          재배하는 작물이기까지 하니, 양파와 마늘을 전파받은 지역에서 둘 중
          하나는 반드시 쓴다고 봐도 좋을 정도로 애용된다. 다만, 마늘은
          향신료로서만 쓰는 경우는 매우 흔하지만, 마늘을 아예 직접 먹는 경우는
          비교적 드물다. 특유의 독한 냄새와 매운맛 때문에 쉽게 먹을 수가 없고,
          괴랄한 자극성 때문에 위장에 영 좋지 않은 느낌을 주기 때문이다.
        </EfficacyContent>
      </EfficacyInfo>
    </EfficacyScreenContainer>
  );
};

const EfficacyScreenContainer = styled.SafeAreaView`
  display: flex;
  background-color: #ffffff;
`;

const EfficacyInfo = styled.View`
  padding: 18px;
`;

const EfficacyText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #383838;

  margin-bottom: 16px;
`;

const EfficacyContent = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;

export default EfficacyScreen;

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getEfficacy} from '../../../services/Ingredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';

const EfficacyComponent = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    // TODO :: ingredientId 동적으로
    getEfficacy(1)
      .then(res => {
        setInfo(res.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <IngredientsHeader
        title="효능 및 정보"
        isTitleOnly={true}
        btnTextValue=""
        screen="EfficacyEdit"
      />
      <IngredientsInfo ingredientName={info.ingredientName} isEdit={false} />
      <EfficacyInfoContainer>
        <EfficacyTitleText>효능</EfficacyTitleText>
        <EfficacyContentText>{info.description}</EfficacyContentText>
      </EfficacyInfoContainer>
    </>
  );
};

const EfficacyInfoContainer = styled.View`
  padding: 18px;
`;

const EfficacyTitleText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #383838;
  font-family: 'Pretendard Variable';

  margin-bottom: 16px;
`;

const EfficacyContentText = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  font-family: 'Pretendard Variable';
`;

export default EfficacyComponent;

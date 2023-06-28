import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getEfficacy} from '../../../services/Ingredients';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';
import {useRoute} from '@react-navigation/native';

const EfficacyComponent = () => {
  const router = useRoute();
  const [efficacyInfo, setEfficacyInfo] = useState({});

  useEffect(() => {
    getEfficacy(router.params.ingredientID)
      .then(res => {
        setEfficacyInfo(res.data);
      })
      .catch(error => console.error(error));
  }, [router.params.ingredientID]);

  return (
    <>
      <IngredientsHeader
        title="효능 및 정보"
        isTitleOnly={true}
        btnTextValue=""
        screen="EfficacyEdit"
      />
      <IngredientsInfo
        ingredientName={efficacyInfo.ingredientName}
        isEdit={false}
      />
      <EfficacyInfoContainer>
        <EfficacyTitleText>효능</EfficacyTitleText>
        <ContentBoxContainer>
          <EfficacyContentText>{efficacyInfo.description}</EfficacyContentText>
        </ContentBoxContainer>
      </EfficacyInfoContainer>
    </>
  );
};

const EfficacyInfoContainer = styled.ScrollView`
  padding-left: 5%;
  padding-right: 5%;
  height: 100%;
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

const ContentBoxContainer = styled.View`
  border: 1px solid #d8d8d8;
  padding: 10px;
  border-radius: 13px;
`;

export default EfficacyComponent;

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getEfficacy, getIngredientsPrep} from '../../../services/Ingredients';
import Line from '../../atoms/Line';
import DList from '../../organisms/Home/DList';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';

const PrepComponent = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [efficacyInfo, setEfficacyInfo] = useState({});
  const [ingredientsPrepInfo, setIngredientsPrepInfo] = useState([]);

  useEffect(() => {
    getEfficacy(router.params.ingredientID)
      .then(res => setEfficacyInfo(res.data))
      .catch(error => console.error(error.response));
  }, [isFocused, router.params.ingredientID]);

  useEffect(() => {
    getIngredientsPrep(router.params.ingredientID)
      .then(res => setIngredientsPrepInfo(res.data.content))
      .catch(error => console.error(error.response));
  }, [isFocused, router.params.ingredientID]);

  return (
    <PrepComponentContainer>
      <IngredientsHeader title="손질법" />
      <IngredientsInfo
        ingredientName={efficacyInfo.ingredientName}
        isEdit={false}
      />

      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <Line />
        <Header>
          <TitleHighlightText>{efficacyInfo.ingredientName}</TitleHighlightText>
          <TitleText> 손질법</TitleText>
        </Header>
        {ingredientsPrepInfo.map((item, index) => {
          return (
            <TouchContainer
              key={index}
              onPress={() =>
                navigation.navigate('PrepDetail', {
                  trimmingID: item.id,
                  ingredientID: router.params.ingredientID,
                })
              }>
              <DList value={item} />
            </TouchContainer>
          );
        })}
      </ScrollViewContainer>
    </PrepComponentContainer>
  );
};

const PrepComponentContainer = styled.SafeAreaView``;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 18px 0 18px 18px;
  background-color: #ffffff;
`;

const TitleHighlightText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const TitleText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 160px;
`;

const TouchContainer = styled.TouchableOpacity``;
export default PrepComponent;

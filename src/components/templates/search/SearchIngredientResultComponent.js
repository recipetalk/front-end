import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import DList from '../../organisms/Home/DList';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import {getSearchIngredient} from '../../../services/Ingredients';
import {IngredientList} from '../../organisms/search/IngredientList';

const SearchIngredientResultComponent = () => {
  const [ingredients, setIngredients] = useState(undefined);
  const searchValue = useSelector(state => state.searchValue.value);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    init();
  }, [searchValue]);

  useEffect(() => {
    init();
  }, [searchValue]);

  const init = async () => {
    getSearchIngredient(searchValue, 0).then(result => {
      const data = JSON.parse(result.request._response);
      setIngredients(() => data);
    });
  };

  if (ingredients === undefined) {
    return null;
  }

  return (
    <Container>
      <TitlePart>
        <TitleLabel>
          <TitleHighlightLabel>식재료</TitleHighlightLabel>로 검색
        </TitleLabel>
      </TitlePart>
      {ingredients.length > 0
        ? ingredients.map(item => <IngredientList item={item} />)
        : undefined}

      {ingredients.length === 0 ? (
        <FooterPart>
          <FooterLabel>식재료가 존재하지 않습니다.</FooterLabel>
        </FooterPart>
      ) : undefined}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  background: white;
  padding: 5%;
  margin-top: 10px;
`;

const TitlePart = styled.View`
  width: 100%;
`;

const TitleHighlightLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`;

const TitleLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #333333;
`;

const FooterPart = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 15px;
`;

const FooterLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #f09311;
`;

export default memo(SearchIngredientResultComponent);

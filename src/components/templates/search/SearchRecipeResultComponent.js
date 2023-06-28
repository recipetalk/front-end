import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import DList from '../../organisms/Home/DList';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';

const SearchRecipeResultComponent = () => {
  const [recipe, setRecipe] = useState(undefined);
  const searchValue = useSelector(state => state.searchValue.value);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    init();
  }, [searchValue]);

  const init = async () => {
    await getDynamicRecipes(searchValue, 'POPULAR', null, null, 0, 2, null)
      .then(res => {
        const data = JSON.parse(res.request._response);
        console.log(data);
        setRecipe(data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  if (recipe === undefined) {
    return null;
  }

  return (
    <Container>
      <TitlePart>
        <TitleLabel>
          <TitleHighlightLabel>레시피</TitleHighlightLabel>로 검색
        </TitleLabel>
      </TitlePart>
      {recipe.length > 0
        ? recipe.map(data => <DList value={data} boardSort={'RECIPE'} />)
        : undefined}

      {recipe.length === 2 ? (
        <FooterPart>
          <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
            <FooterLabel>그 외 레시피 더보기</FooterLabel>
          </TouchableOpacity>
        </FooterPart>
      ) : undefined}

      {recipe.length === 0 ? (
        <FooterPart>
          <FooterLabel>레시피가 존재하지 않습니다.</FooterLabel>
        </FooterPart>
      ) : undefined}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  background: white;
  padding: 5%;
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

export default memo(SearchRecipeResultComponent);

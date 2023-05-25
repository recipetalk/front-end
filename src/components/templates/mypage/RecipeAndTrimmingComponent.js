import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../atoms/board/RadioButton';
import HList from '../../organisms/Home/HList';
import {FlatList, TouchableWithoutFeedback, View} from 'react-native';
import ModalDropDownPickerComponent from '../../molecules/ModalDropDownPickerComponent';
import {RecipeSortList} from '../../../category/recipe/RecipeSortList';
import {RecipeSituationList} from '../../../category/recipe/RecipeSituationList';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import {determinePageEnd} from '../../../utils/determinePageEnd';
import {getIngredientPrepByUsername} from '../../../services/Ingredients';

export const RecipeAndTrimmingComponent = props => {
  const [isHighLight, setHighLight] = useState(1);
  const [firstClicked, setFirstClicked] = useState({id: 1});
  const [secondClicked, setSecondClicked] = useState({id: 1});
  const [firstCategoryValue, setFirstCategoryValue] = useState(null);
  const [secondCategoryValue, setSecondCategoryValue] = useState(null);
  const [recipeOffset, setRecipeOffset] = useState(0);
  const [recipeLimit, setRecipeLimit] = useState(10);
  const [recipeLast, setRecipeLast] = useState(false);
  const [isRecipeRefresh, setRecipeRefresh] = useState(false);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipe, setRecipe] = useState([]);

  const [prep, setPrep] = useState([]);
  const [prepOffset, setPrepOffset] = useState(0);
  const [prepLimit, setPrepLimit] = useState(10);
  const [prepLast, setPrepLast] = useState(false);
  const [isPrepRefresh, setPrepRefresh] = useState(false);
  const [prepLoading, setPrepLoading] = useState(false);

  const firstFilter = [
    {
      id: 1,
      onPress: () => setFirstClicked({id: 1}),
      title: '최신',
      value: 'NEW',
    },
    {
      id: 2,
      onPress: () => setFirstClicked({id: 2}),
      title: '인기',
      value: 'POPULAR',
    },
  ];

  const secondFilter = [
    {
      id: 1,
      onPress: () => setSecondClicked({id: 1}),
      title: '최신',
      value: 'NEW',
    },
    {
      id: 2,
      onPress: () => setSecondClicked({id: 2}),
      title: '인기',
      value: 'POPULAR',
    },
  ];

  useEffect(() => {
    recipeInit();
  }, [firstClicked, firstCategoryValue, secondCategoryValue]);

  const recipeInit = useCallback(async () => {
    await setRecipeLoading(() => true);
    await getDynamicRecipes(
      null,
      firstFilter[firstClicked.id - 1].value,
      firstCategoryValue,
      secondCategoryValue,
      0,
      10,
      props?.username,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        setRecipe(() => data);
        setRecipeLast(() => determinePageEnd(data.length, recipeLimit));
        setRecipeOffset(() => 10);
      })
      .catch(err => {
        console.log(err.response);
      });
    await setRecipeLoading(() => false);
  }, [firstClicked, firstCategoryValue, secondCategoryValue, props?.username]);

  const onRecipeRefresh = async () => {
    await setRecipeRefresh(true);
    await recipeInit().then(() => setRecipeRefresh(false));
  };

  const onRecipeRequest = useCallback(async () => {
    await setRecipeLoading(() => true);

    await getDynamicRecipes(
      null,
      firstFilter[firstClicked.id - 1].value,
      firstCategoryValue,
      secondCategoryValue,
      recipeOffset,
      recipeLimit,
      props.username,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        setRecipe(recipes => recipes.concat(data));
        setRecipeLast(() => determinePageEnd(data.length, recipeLimit));
        setRecipeOffset(recipeOffset => recipeOffset + recipeLimit);
      })
      .catch(err => {
        console.log(err.response);
      });
    await setRecipeLoading(() => false);
  }, [
    firstClicked,
    firstCategoryValue,
    secondCategoryValue,
    recipeOffset,
    recipeLimit,
    props.username,
  ]);

  useEffect(() => {
    prepInit();
  }, [secondClicked]);

  const prepInit = useCallback(async () => {
    setPrepLoading(() => true);
    console.log(
      secondFilter[secondClicked.id - 1].value,
      prepOffset,
      prepLimit,
      props?.username,
    );

    await getIngredientPrepByUsername(
      props?.username,
      secondFilter[secondClicked.id - 1].value,
      0,
      10,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        setPrep(() => data);
        setPrepLast(() => determinePageEnd(data.length, prepLimit));
        setPrepOffset(() => 10);
      })
      .catch(err => {
        console.log(err.response);
      });

    setPrepLoading(() => false);
  }, [secondClicked, prepOffset, prepLimit, props?.username]);

  const onPrepRefresh = async () => {
    await setPrepRefresh(true);
    await prepInit().then(() => setPrepRefresh(false));
  };

  const onPrepRequest = useCallback(async () => {
    await setPrepLoading(() => true);
    await getIngredientPrepByUsername(
      props?.username,
      secondFilter[secondClicked.id].value,
      prepOffset,
      prepLimit,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        setPrep(recipes => recipes.concat(data));
        setPrepLast(() => determinePageEnd(data.length, prepLimit));
        setPrepOffset(prepOffset => prepOffset + prepLimit);
      })
      .catch(err => {
        console.log(err.response);
      });
    await setPrepLoading(() => false);
  }, [props?.username, secondFilter, prepOffset, prepLimit]);


  const recipeRefreshHandler = useCallback(() => {
    if (recipeLoading) {
      return;
    }
    if (!recipeLast) {
      onRecipeRequest();
    }
  }, [recipeLoading, recipeLast]);

  const prepRefreshHandler = useCallback(() => {
    if (prepLoading) {
      return;
    }
    if (!prepLast) {
      onPrepRequest();
    }
  }, [prepLast, prepLoading]);

  return (
    <Container>
      <NavigationPart>
        <NavigationButtonPart onPress={() => setHighLight(1)}>
          <NavigationLabel isActive={isHighLight === 1}>
            나의 레시피
          </NavigationLabel>
          {isHighLight === 1 && <NavigationBottomBar width={'81px'} />}
        </NavigationButtonPart>
        <NavigationButtonPart onPress={() => setHighLight(2)}>
          <NavigationLabel isActive={isHighLight === 2}>
            식재료 손질법
          </NavigationLabel>
          {isHighLight === 2 && <NavigationBottomBar width={'93px'} />}
        </NavigationButtonPart>
      </NavigationPart>

      <FilterPart>
        {isHighLight === 1 ? (
          <>
            <View style={{flexDirection: 'row'}}>
              {firstFilter.map(value => (
                <RadioButton
                  onPress={value.onPress}
                  backgroundColor={'#D8D8D8'}
                  clickedBackgroundColor={'#666666'}
                  textColor={'#666666'}
                  clickedTextColor={'#D8D8D8'}
                  clickedNumber={firstClicked.id}
                  item={value}
                />
              ))}
            </View>
            <VerticalBar />
            <CategorySelectorContainer>
              <TouchableWithoutFeedback>
                <ModalDropDownPickerComponent
                  value={firstCategoryValue}
                  setValue={setFirstCategoryValue}
                  items={RecipeSortList}
                  placeholder={'종류별'}
                  minHeight={'31px'}
                  width={'100px'}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <ModalDropDownPickerComponent
                  value={secondCategoryValue}
                  setValue={setSecondCategoryValue}
                  items={RecipeSituationList}
                  placeholder={'상황별'}
                  minHeight={'31px'}
                  width={'100px'}
                />
              </TouchableWithoutFeedback>
            </CategorySelectorContainer>
          </>
        ) : (
          <View style={{flexDirection: 'row'}}>
            {secondFilter.map(value => (
              <RadioButton
                onPress={value.onPress}
                backgroundColor={'#D8D8D8'}
                clickedBackgroundColor={'#666666'}
                textColor={'#666666'}
                clickedTextColor={'#D8D8D8'}
                clickedNumber={secondClicked.id}
                item={value}
              />
            ))}
          </View>
        )}
      </FilterPart>

      <HListView>
        {isHighLight === 1 ? (
          <FlatList
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={{height: '100%', paddingBottom: '20%'}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={recipe}
            renderItem={({item}) => {
              return <HList value={item} boardSort={'RECIPE'} />;
            }}
            keyExtractor={keyExtractorHandler}
            onRefresh={onRecipeRefresh}
            refreshing={isRecipeRefresh}
            onEndReached={() => recipeRefreshHandler()}
            onEndReachedThreshold={0.8}
            maxToRenderPerBatch={6}
          />
        ) : (
          <FlatList
            numColumns={2}
            contentContainerStyle={{height: '100%', paddingBottom: '20%'}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            scrollEnabled={false}
            data={prep}
            renderItem={({item}) => {
              return <HList value={item} boardSort={'TRIMMING'} />;
            }}
            keyExtractor={keyExtractorHandler}
            onRefresh={onPrepRefresh}
            refreshing={isPrepRefresh}
            onEndReached={() => prepRefreshHandler()}
            maxToRenderPerBatch={6}
            onEndReachedThreshold={0.8}
          />
        )}
      </HListView>
    </Container>
  );
};

const keyExtractorHandler = _ => {
  return _?.board?.boardId;
};

const FilterPart = styled.View`
  width: auto;
  height: auto;
  flex-direction: row;
  margin-top: 10px;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: white;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 30px;
  margin-top: 6px;
  gap: 10px;
`;

const NavigationPart = styled.View`
  height: 27px;
  gap: 20px;
  flex-direction: row;
`;

const NavigationButtonPart = styled.TouchableOpacity`
  width: auto;
  height: 100%;
  gap: 5px;
`;

const NavigationLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: ${props => (props.isActive ? '#383838' : '#a4a4a4')};
`;

const NavigationBottomBar = styled.View`
  width: 100%;
  height: 2px;
  background: #333333;
`;

const VerticalBar = styled.View`
  border: 1px solid #d8d8d8;
  height: 30px;
  margin-left: 5px;
  margin-right: 10px;
`;

const HListView = styled.View``;

const CategorySelectorContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  width: 100%;
  z-index: 100;
`;

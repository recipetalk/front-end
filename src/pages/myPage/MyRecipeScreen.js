import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../components/atoms/board/RadioButton';
import HList from '../../components/organisms/Home/HList';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import ModalDropDownPickerComponent from '../../components/molecules/ModalDropDownPickerComponent';
import {RecipeSortList} from '../../category/recipe/RecipeSortList';
import {RecipeSituationList} from '../../category/recipe/RecipeSituationList';
import {getDynamicRecipes} from '../../services/recipe/Recipe';
import {loadLoginFromStorage} from '../../services/repository/AutoLogin';
import {determinePageEnd} from '../../utils/determinePageEnd';
import {request} from 'axios';

export const MyRecipeScreen = ({navigation}) => {
  const [firstClicked, setFirstClicked] = useState({key: 1});
  const [firstCategoryValue, setFirstCategoryValue] = useState(null);
  const [secondCategoryValue, setSecondCategoryValue] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [last, setLast] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const firstFilter = [
    {
      key: 1,
      onPress: () => setFirstClicked({key: 1}),
      title: '최신',
      value: 'NEW',
    },
    {
      key: 2,
      onPress: () => setFirstClicked({key: 2}),
      title: '인기',
      value: 'POPULAR',
    },
  ];

  useEffect(() => {
    init();
  }, [firstClicked, firstCategoryValue, secondCategoryValue]);

  const init = async () => {
    await setLoading(() => true);
    const username = (await loadLoginFromStorage()).username;
    await getDynamicRecipes(
      null,
      firstFilter[firstClicked.key - 1].value,
      firstCategoryValue,
      secondCategoryValue,
      0,
      limit,
      username,
    )
      .then(res => {
        const data = JSON.parse(res.request._response);
        setRecipe(data);
        setLast(() => determinePageEnd(data.length, limit));
        setOffset(() => 20);
      })
      .catch(err => {
        console.log(err.response);
      });
    await setLoading(() => false);
  };

  const onRefresh = async () => {
    await setRefresh(true);
    await init().then();
    setTimeout(() => setRefresh(false), 1000);
  };

  const onRequest = async () => {
    await setLoading(() => true);
    const username = (await loadLoginFromStorage()).username;
    await getDynamicRecipes(
      null,
      firstFilter[firstClicked.key - 1].value,
      firstCategoryValue,
      secondCategoryValue,
      offset,
      limit,
      username,
    ).then(res => {
      const data = JSON.parse(res.request._response);
      setRecipe(recipes => recipes.concat(data));
      setLast(() => determinePageEnd(data.length, limit));
      setOffset(offset => offset + limit);
      console.log(recipe);
    });
    setLoading(() => false);
  };

  if (recipe == null) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={'#f09311'} size="large" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <NavigationHeader navigation={navigation} title={'나의 레시피'} />
      <HorizontalBar />
      <InnerContainer>
        <FilterPart>
          {firstFilter.map(value => (
            <RadioButton
              onPress={value.onPress}
              backgroundColor={'#D8D8D8'}
              clickedBackgroundColor={'#666666'}
              textColor={'#666666'}
              clickedTextColor={'#D8D8D8'}
              clickedNumber={firstClicked.key}
              item={value}
            />
          ))}
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
        </FilterPart>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{height: 'auto', paddingBottom: '20%'}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={recipe}
          renderItem={({item}) => {
            return <HList value={item} boardSort={'RECIPE'} />;
          }}
          keyExtractor={_ => _?.board?.boardId}
          onRefresh={onRefresh}
          refreshing={isRefresh}
          onEndReached={() => {
            if (loading) {
              return;
            }
            if (!last) {
              onRequest();
            }
          }}
          ListEmptyComponent={
            <EmptyContainer>
              <Text
                style={{
                  fontStyle: 'normal',
                  fontFamily: 'Pretendard Variable',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#333333',
                }}>
                아직 작성한 레시피가 없습니다.
              </Text>
            </EmptyContainer>
          }
          onEndReachedThreshold={0.6}
          maxToRenderPerBatch={3}
        />
      </InnerContainer>
    </Container>
  );
};

const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;


const LoadingContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
  margin-bottom: 70px;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

const InnerContainer = styled.View`
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
  height: 100%;
`;

const HListView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  z-index: -1;
  justify-content: space-between;
`;

const VerticalBar = styled.View`
  border: 1px solid #d8d8d8;
  height: 30px;
  margin-left: 5px;
  margin-right: 10px;
`;
const FilterPart = styled.View`
  width: auto;
  height: auto;
  flex-direction: row;
  margin-top: 10px;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;
const CategorySelectorContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  width: 100%;
  z-index: 100;
`;

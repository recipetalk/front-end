import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import RadioButton from '../../atoms/board/RadioButton';
import {useSelector, useDispatch} from 'react-redux';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import ModalDropDownPickerComponent from '../../molecules/ModalDropDownPickerComponent';
import {RecipeSortList} from '../../../category/recipe/RecipeSortList';
import {RecipeSituationList} from '../../../category/recipe/RecipeSituationList';
import {setSortCategory} from '../../../store/RecipeHome/SortCategory';
import {setSituationCategory} from '../../../store/RecipeHome/SituationCategory';
import {setGoToRecipeHome} from '../../../store/RecipeHome/IsGoToRecipeHome';
import {useNavigation} from '@react-navigation/native';

const SearchWithFilterHeader = () => {
  const firstClicked = useSelector(state => state.firstFilterClicked.value);
  const sortCategory = useSelector(state => state.sortCategory.value);
  const situationCategory = useSelector(state => state.situationCategory.value);
  const [firstCategoryValue, setFirstCategoryValue] = useState(null);
  const [secondCategoryValue, setSecondCategoryValue] = useState(null);
  const isGoToRecipeHome = useSelector(state => state.isGoToRecipeHome.value);
  const dispatch = useDispatch();
  const textBoxRef = useRef();
  const navigation = useNavigation();
  const searchValue = useSelector(state => state.searchValue.value);
  const firstFilter = [
    {
      key: 1,
      onPress: () => dispatch(setFirstClicked({key: 1, title: '최신'})),
      title: '최신',
    },
    {
      key: 2,
      onPress: () => dispatch(setFirstClicked({key: 2, title: '인기'})),
      title: '인기',
    },
    {
      key: 3,
      onPress: () => dispatch(setFirstClicked({key: 3, title: '이웃'})),
      title: '이웃',
    },
  ];

  const onFocusAction = () => {
    textBoxRef.current.blur();
    navigation.push('Search', {nextNavigation: 'Recipe'});
  };

  useEffect(() => {
    dispatch(setSortCategory(firstCategoryValue));
  }, [firstCategoryValue]);

  useEffect(() => {
    dispatch(setSituationCategory(secondCategoryValue));
  }, [secondCategoryValue]);

  useEffect(() => {
    if (isGoToRecipeHome) {
      setFirstCategoryValue(sortCategory);
      setSecondCategoryValue(situationCategory);
      dispatch(setGoToRecipeHome(false));
    }
  }, [isGoToRecipeHome]);

  return (
    <SearchHeaderContainer>
      <SearchInputContainer>
        <InputBox>
          <CustomInput
            ref={textBoxRef}
            placeholder="검색어를 입력해주세요"
            placeholderTextColor="#a4a4a4"
            onFocus={onFocusAction}
            value={searchValue}
          />
          <TouchableOpacity>
            <SearchIcon
              source={require('../../../assets/images/SearchIcon.png')}
            />
          </TouchableOpacity>
        </InputBox>
      </SearchInputContainer>
      <HorizontalScrollContainer horizontal={true}>
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
              value={sortCategory}
              setValue={setFirstCategoryValue}
              items={RecipeSortList}
              placeholder={'종류별'}
              minHeight={'31px'}
              width={'140px'}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <ModalDropDownPickerComponent
              value={situationCategory}
              setValue={setSecondCategoryValue}
              items={RecipeSituationList}
              placeholder={'상황별'}
              minHeight={'31px'}
              width={'100px'}
            />
          </TouchableWithoutFeedback>
        </CategorySelectorContainer>
      </HorizontalScrollContainer>
    </SearchHeaderContainer>
  );
};

const VerticalBar = styled.View`
  border: 1px solid #d8d8d8;
  height: 30px;
  margin-left: 7px;
  margin-right: 15px;
`;

const SearchHeaderContainer = styled.SafeAreaView`
  background: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 2;
  gap: 10px;
  padding-top: 10px;
`;

const SearchInputContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const HorizontalScrollContainer = styled.ScrollView`
  margin-left: 5%;
  margin-right: 5%;
`;

const CategorySelectorContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;

const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const InputBox = styled.View`
  position: relative;
  width: 100%;
  height: 44px;
  background: #ffffff;
  border: 1px solid #f09311;
  border-radius: 100px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 5%;
  padding-right: 5%;
  gap: 7px;
`;

const CustomInput = styled.TextInput`
  font-family: 'Pretendard Variable';
  flex: 1;
  color: #333333;
`;

export default SearchWithFilterHeader;

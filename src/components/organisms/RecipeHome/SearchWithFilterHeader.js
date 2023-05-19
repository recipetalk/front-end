import React, {useState} from 'react';
import {Platform, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import SearchInput from '../../atoms/SearchInput';
import RadioButton from '../../atoms/board/RadioButton';
import {useSelector, useDispatch} from 'react-redux';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import ModalDropDownPickerComponent from '../../molecules/ModalDropDownPickerComponent';
import {RecipeSortList} from '../../../category/recipe/RecipeSortList';
import {RecipeSituationList} from '../../../category/recipe/RecipeSituationList';

const SearchWithFilterHeader = () => {
  const firstClicked = useSelector(state => state.firstFilterClicked.value);
  const [firstCategoryValue, setFirstCategoryValue] = useState(null);
  const [secondCategoryValue, setSecondCategoryValue] = useState(null);

  const dispatch = useDispatch();

  const firstFilter = [
    {
      id: 1,
      onPress: () => dispatch(setFirstClicked({id: 1, title: '최신'})),
      title: '최신',
    },
    {
      id: 2,
      onPress: () => dispatch(setFirstClicked({id: 2, title: '인기'})),
      title: '인기',
    },
    {
      id: 3,
      onPress: () => dispatch(setFirstClicked({id: 3, title: '이웃'})),
      title: '이웃',
    },
  ];

  return (
    <SearchHeaderContainer>
      <SearchInputContainer>
        <SearchInput />
      </SearchInputContainer>
      <HorizontalScrollContainer horizontal={true}>
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
`;

const SearchInputContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const HorizontalScrollContainer = styled.ScrollView`
  margin-left: 20px;
`;

const CategorySelectorContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;

export default SearchWithFilterHeader;

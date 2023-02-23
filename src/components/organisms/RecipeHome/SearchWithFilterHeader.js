import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import SearchInput from '../../atoms/SearchInput';
import RadioButton from '../../atoms/board/RadioButton';
import {useSelector, useDispatch} from 'react-redux';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import {setSecondClicked} from '../../../store/RecipeHome/SecondFilterClicked';

const SearchWithFilterHeader = () => {
  const SearchHeaderContainer =
    Platform.OS === 'ios'
      ? styled.SafeAreaView`
          background: #f5f5f5;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
          z-index: 1;
        `
      : styled.View`
          background: #f5f5f5;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
          z-index: 1;
        `;

  const SearchInputContainer = styled.View`
    width: 90%;
    margin: 0 auto;
  `;

  const HorizontalScrollContainer = styled.ScrollView`
    margin-left: 20px;
  `;

  const firstClicked = useSelector(state => state.firstFilterClicked.value);
  const secondClicked = useSelector(state => state.secondFilterClicked.value);

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

  const secondFilter = [
    {
      id: 1,
      onPress: () => dispatch(setSecondClicked({id: 1, title: '한식'})),
      title: '한식',
    },
    {
      id: 2,
      onPress: () => dispatch(setSecondClicked({id: 2, title: '건강'})),
      title: '건강',
    },
    {
      id: 3,
      onPress: () => dispatch(setSecondClicked({id: 3, title: '건강'})),
      title: '건강',
    },
    {
      id: 4,
      onPress: () => dispatch(setSecondClicked({id: 4, title: '건강'})),
      title: '건강',
    },
    {
      id: 5,
      onPress: () => dispatch(setSecondClicked({id: 5, title: '건강'})),
      title: '건강',
    },
  ];

  const VerticalBar = styled.View`
    border: 1px solid #d8d8d8;
    height: 30px;
    margin-left: 7px;
    margin-right: 15px;
  `;

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
        {secondFilter.map(value => (
          <RadioButton
            onPress={value.onPress}
            backgroundColor={'#FFFFFF'}
            clickedBackgroundColor={'#FFFFFF'}
            textColor={'#333333'}
            clickedTextColor={'#F09311'}
            clickedNumber={secondClicked.id}
            item={value}
            borderColor={'#D8D8D8'}
            clickedBorderColor={'#F09311'}
          />
        ))}
      </HorizontalScrollContainer>
    </SearchHeaderContainer>
  );
};

export default SearchWithFilterHeader;

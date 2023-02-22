import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import SearchInput from '../../atoms/SearchInput';
import RadioButton from './RadioButton';
import {useSelector, useDispatch} from 'react-redux';
import {setFirstClickedNum} from '../../../store/RecipeHome/FirstFilterClickedNum';
import {setSecondClickedNum} from '../../../store/RecipeHome/SecondFilterClickedNum';

const SearchWithFilterHeader = () => {
  const SearchHeaderContainer =
    Platform.OS === 'ios'
      ? styled.SafeAreaView`
          background: #f5f5f5;
          margin: 0 15px;
        `
      : styled.View`
          background: #f5f5f5;
          margin: 0 15px;
        `;

  const HorizontalScrollContainer = styled.ScrollView``;

  const firstClickedNum = useSelector(state => state.firstFilterClickedNum);
  const secondClickedNum = useSelector(state => state.secondFilterClickedNum);

  const dispatch = useDispatch();

  const firstFilter = [
    {
      id: 1,
      onPress: () => dispatch(setFirstClickedNum(1)),
      title: '최신',
    },
    {
      id: 2,
      onPress: () => dispatch(setFirstClickedNum(2)),
      title: '인기',
    },
    {
      id: 3,
      onPress: () => dispatch(setFirstClickedNum(3)),
      title: '이웃',
    },
  ];

  const secondFilter = [
    {
      id: 1,
      onPress: () => dispatch(setSecondClickedNum(1)),
      title: '한식',
    },
    {
      id: 2,
      onPress: () => dispatch(setSecondClickedNum(2)),
      title: '건강',
    },
    {
      id: 3,
      onPress: () => dispatch(setSecondClickedNum(3)),
      title: '건강',
    },
    {
      id: 4,
      onPress: () => dispatch(setSecondClickedNum(4)),
      title: '건강',
    },
    {
      id: 5,
      onPress: () => dispatch(setSecondClickedNum(5)),
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
      <SearchInput />
      <HorizontalScrollContainer horizontal={true}>
        {firstFilter.map(value => (
          <RadioButton
            onPress={value.onPress}
            backgroundColor={'#D8D8D8'}
            clickedBackgroundColor={'#666666'}
            textColor={'#666666'}
            clickedTextColor={'#D8D8D8'}
            clickedNumber={firstClickedNum}
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
            clickedNumber={secondClickedNum}
            item={value}
            borderColor={'#333333'}
            clickedBorderColor={'#F09311'}
          />
        ))}
      </HorizontalScrollContainer>
    </SearchHeaderContainer>
  );
};

export default SearchWithFilterHeader;

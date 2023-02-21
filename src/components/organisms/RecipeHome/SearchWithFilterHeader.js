import React, {useState} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import SearchInput from '../../atoms/SearchInput';
import RadioButton from './RadioButton';

// props는 차 후 ui 이동할 때 검색어가 남아있도록 하기 위함.
const SearchWithFilterHeader = props => {
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

  let [firstIsClicked, setFirstIsClicked] = useState(1);
  let [secondIsClicked, setSecondIsClicked] = useState(1);

  const firstFilter = [
    {
      id: 1,
      onPress: () => setFirstIsClicked(1),
      title: '최신',
    },
    {
      id: 2,
      onPress: () => setFirstIsClicked(2),
      title: '인기',
    },
    {
      id: 3,
      onPress: () => setFirstIsClicked(3),
      title: '이웃',
    },
  ];

  const secondFilter = [
    {
      id: 1,
      onPress: () => setSecondIsClicked(1),
      title: '한식',
    },
    {
      id: 2,
      onPress: () => setSecondIsClicked(2),
      title: '건강',
    },
    {
      id: 3,
      onPress: () => setSecondIsClicked(3),
      title: '건강',
    },
    {
      id: 4,
      onPress: () => setSecondIsClicked(4),
      title: '건강',
    },
    {
      id: 5,
      onPress: () => setSecondIsClicked(5),
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
            clickedNumber={firstIsClicked}
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
            clickedNumber={secondIsClicked}
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

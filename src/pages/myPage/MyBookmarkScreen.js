import React, {useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../components/atoms/board/RadioButton';
import DropDownPickerComponent from '../../components/molecules/DropDownPickerComponent';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import DList from '../../components/organisms/Home/DList';
import {TouchableOpacity} from 'react-native';

export const MyBookmarkScreen = ({navigation}) => {
  const [firstClicked, setFirstClicked] = useState({id: 1, title: '최신'});
  const dummy = [1, 2, 3, 4, 5];
  const firstFilter = [
    {
      id: 1,
      onPress: () => setFirstClicked({id: 1, title: '최신'}),
      title: '최신',
    },
    {
      id: 2,
      onPress: () => setFirstClicked({id: 2, title: '인기'}),
      title: '인기',
    },
  ];
  const oneItem = [
    {placeholder: '카테고리', label: '최신순', value: '최신순'},
    {placeholder: '카테고리', label: '과거순', value: '과거순'},
  ];

  const twoItem = [
    {placeholder: '메뉴', label: '오름차순', value: '오름차순'},
    {placeholder: '메뉴', label: '내림차순', value: '내림차순'},
  ];

  return (
    <Container>
      <NavigationHeader navigation={navigation} title={'나의 북마크'} />
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
              clickedNumber={firstClicked.id}
              item={value}
            />
          ))}
          <VerticalBar />
          <DropdownContainer>
            <DropDownPickerComponent
              width="110px"
              items={oneItem}
              minHeight={'25px'}
            />
          </DropdownContainer>
          <DropdownContainer>
            <DropDownPickerComponent
              width="85px"
              items={twoItem}
              minHeight={'25px'}
            />
          </DropdownContainer>
        </FilterPart>
        {dummy.map((v, i) => {
          return <CustomDList key={v} value={i} />;
        })}
      </InnerContainer>
    </Container>
  );
};

const CustomDList = ({key, value}) => {
  return (
    <CustomDListContainer>
      <DList key={key} value={value} />
      <TouchableOpacity>
        <BookmarkImage
          source={require('../../assets/images/BookmarkTrue.png')}
        />
      </TouchableOpacity>
    </CustomDListContainer>
  );
};

const CustomDListContainer = styled.View`
  width: 100%;
  position: relative;
`;

const BookmarkImage = styled.Image`
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 10px;
  right: 5%;
`;

const DropdownContainer = styled.View``;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

const InnerContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
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
  padding-left: 5%;
  padding-right: 5%;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;

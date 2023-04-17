import React, {useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../components/atoms/board/RadioButton';
import DropDownPickerComponent from '../../components/molecules/DropDownPickerComponent';
import HList from '../../components/organisms/Home/HList';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import {FlatList} from 'react-native';

export const MyRecipeScreen = ({navigation}) => {
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
              zIndex={1000}
              zIndexInverse={3000}
            />
            <DropDownPickerComponent
              width="85px"
              items={twoItem}
              minHeight={'25px'}
              zIndex={2000}
              zIndexInverse={2000}
            />
          </DropdownContainer>
        </FilterPart>
        <HListView>
          <FlatList
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
            data={dummy}
            renderItem={({item, i}) => {
              return <HList key={i} value={item} />;
            }}
          />
        </HListView>
      </InnerContainer>
    </Container>
  );
};

const DropdownContainer = styled.View`
  flex-direction: row;
  gap: 10px;
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

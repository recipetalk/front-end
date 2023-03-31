import React, {useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../atoms/board/RadioButton';
import HComponent from '../Home/HComponent';
import HList from '../../organisms/Home/HList';
import DropDownPickerComponent from '../../molecules/DropDownPickerComponent';
import {View} from 'react-native';

export const RecipeAndTrimmingComponent = () => {
  const [isHighLight, setHighLight] = useState(1);
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
      <HListView>
        {dummy.map((v, i) => {
          return <HList key={i} value={v} />;
        })}
      </HListView>
    </Container>
  );
};

const DropdownContainer = styled.View``;

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
const HListView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;
`;

const VerticalBar = styled.View`
  border: 1px solid #d8d8d8;
  height: 30px;
  margin-left: 5px;
  margin-right: 10px;
`;

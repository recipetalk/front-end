import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import SearchInput from '../../components/atoms/SearchInput';
import {SearchHistoryComponent} from '../../components/templates/search/SearchHistoryComponent';
import {useNavigation} from '@react-navigation/native';
import SearchResultComponent from '../../components/templates/search/SearchRecipeResultComponent';
import SearchRecipeResultComponent from '../../components/templates/search/SearchRecipeResultComponent';
import {useSelector} from 'react-redux';
import SearchIngredientResultComponent from '../../components/templates/search/SearchIngredientResultComponent';

export const SearchResultScreen = () => {
  const navigation = useNavigation();
  const textBoxRef = useRef();

  const onFocusAction = () => {
    textBoxRef.current.blur();
    navigation.push('Search', {nextNavigation: 'SearchResult'});
  };

  return (
    <SearchScreenContainer>
      <Header>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Back source={require('../../assets/images/Back.png')} />
        </TouchableOpacity>
      </Header>
      <InnerContainer>
        <Logo
          source={require('../../assets/images/Logo_o.png')}
          resizeMode={'contain'}
        />
        <InputBox>
          <CustomInput
            ref={textBoxRef}
            placeholder="검색어를 입력해주세요"
            placeholderTextColor="#a4a4a4"
            onFocus={onFocusAction}
          />
          <TouchableOpacity>
            <SearchIcon
              source={require('../../assets/images/SearchIcon.png')}
            />
          </TouchableOpacity>
        </InputBox>
        <SearchRecipeResultComponent />
        <SearchIngredientResultComponent />
      </InnerContainer>
    </SearchScreenContainer>
  );
};

const SearchScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.ScrollView`
  padding-top: 5%;
`;

const Header = styled.View`
  margin-left: 5%;
  margin-top: 5%;
`;

const Back = styled.Image``;

const Logo = styled.Image`
  width: 110px;
  margin: 15px auto 18px;
`;

const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const InputBox = styled.View`
  margin-left: 5%;
  position: relative;
  width: 90%;
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
  margin-bottom: 20px;
`;

const CustomInput = styled.TextInput`
  font-family: 'Pretendard Variable';
  flex: 1;
`;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import SearchInput from '../../components/atoms/SearchInput';
import {SearchHistoryComponent} from '../../components/templates/search/SearchHistoryComponent';
import {deleteAllSearchHistoryToStorage} from '../../services/repository/SearchHistory';

const SearchScreen = ({navigation, route}) => {
  return (
    <SearchScreenContainer>
      <InnerContainer>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Back source={require('../../assets/images/Back.png')} />
        </TouchableOpacity>
        <Logo
          source={require('../../assets/images/Logo_o.png')}
          resizeMode={'contain'}
        />
        <SearchInput nextNavigation={route.params.nextNavigation} />
        <TotalCategory>최근 검색어</TotalCategory>

        <SearchHistoryComponent nextNavigation={route.params?.nextNavigation} />
      </InnerContainer>
    </SearchScreenContainer>
  );
};

const TouchableBox = styled.TouchableOpacity`
  width: 70px;
`;

const SearchScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.View`
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 5%;
  gap: 10px;
  height: 100%;
`;

const Back = styled.Image``;
const Logo = styled.Image`
  width: 110px;
  margin: 15px auto 18px;
`;

const TotalCategory = styled.Text`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Pretendard Variable';
  color: #a9a9a9;
`;

const TotalCategoryContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
  padding: 10px;
`;

export default SearchScreen;

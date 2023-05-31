import React, {useRef, useState} from 'react';
import SearchInput from '../components/atoms/SearchInput';
import styled from 'styled-components/native';
import Header from '../components/organisms/Header';
import AComponent from '../components/templates/Home/AComponent';
import CComponent from '../components/templates/Home/CComponent';
import RecentComponent from '../components/templates/Home/RecentComponent';
import HotComponent from '../components/templates/Home/HotComponent';
import PickComponent from '../components/templates/Home/PickComponent';
import GComponent from '../components/templates/Home/GComponent';
import OnePersonRecipeComponent from '../components/templates/Home/OnePersonRecipeComponent';
import Footer from '../components/organisms/Footer';
import {FlatList, TouchableOpacity, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  const textBoxRef = useRef();
  const onFocusAction = () => {
    textBoxRef.current.blur();
    navigation.push('Search', {nextNavigation: 'SearchResult'});
  };

  const [isRefresh, setRefresh] = useState(false);
  return (
    <>
      <HomeScreenContainer edges={['top']} />
      <Header />
      <RefreshContainer
        isRefresh={isRefresh}
        setRefresh={setRefresh}
        showsVerticalScrollIndicator={false}>
        <InputBox>
          <CustomInput
            ref={textBoxRef}
            placeholder="검색어를 입력해주세요"
            placeholderTextColor="#a4a4a4"
            onFocus={onFocusAction}
          />
          <TouchableOpacity>
            <SearchIcon source={require('../assets/images/SearchIcon.png')} />
          </TouchableOpacity>
        </InputBox>

        {/*<AComponent />*/}
        <CComponent />
        <RecentComponent isRefresh={isRefresh} />
        <HotComponent isRefresh={isRefresh} />
        <PickComponent isRefresh={isRefresh} />
        {/*<GComponent />*/}
        <OnePersonRecipeComponent isRefresh={isRefresh} />
        <Footer />
      </RefreshContainer>
    </>
  );
};

const RefreshContainer = props => {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      refreshing={props.isRefresh}
      onRefresh={() => {
        props.setRefresh(() => true);
        setTimeout(() => props.setRefresh(false), 1000);
      }}
      ListHeaderComponent={<>{props.children}</>}
    />
  );
};

const HomeScreenContainer = styled.SafeAreaView`
  background: #f09311;
`;

const InputBox = styled.View`
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
  margin-top: 15px;
  margin-left: 5%;
  margin-right: 5%;
  gap: 7px;
`;

const CustomInput = styled.TextInput`
  font-family: 'Pretendard Variable';
  flex: 1;
`;
const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

export default HomeScreen;

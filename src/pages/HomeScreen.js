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
import {FlatList, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  const textBoxRef = useRef();
  const onFocusAction = () => {
    textBoxRef.current.blur();
    navigation.push('Search');
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
        <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
          <CustomInput
            ref={textBoxRef}
            paddingLeft={10}
            placeholder="검색어를 입력해주세요"
            onFocus={() => onFocusAction()}
          />
        </View>
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

const CustomInput = styled.TextInput`
  position: relative;
  width: 100%;
  height: 44px;
  background: #ffffff;
  border: 1px solid #f09311;
  border-radius: 100px;
  margin-top: 18px;
  margin-bottom: 18px;
  font-family: 'Pretendard Variable';
`;
export default HomeScreen;

import React, {useRef} from 'react';
import SearchInput from '../components/atoms/SearchInput';
import styled from 'styled-components/native';
import Header from '../components/organisms/Header';
import AComponent from '../components/templates/Home/AComponent';
import CComponent from '../components/templates/Home/CComponent';
import DComponent from '../components/templates/Home/DComponent';
import EComponent from '../components/templates/Home/EComponent';
import FComponent from '../components/templates/Home/FComponent';
import GComponent from '../components/templates/Home/GComponent';
import HComponent from '../components/templates/Home/HComponent';
import Footer from '../components/organisms/Footer';
import {View} from 'react-native';

const HomeScreen = ({navigation}) => {
  const textBoxRef = useRef();
  const onFocusAction = () => {
    textBoxRef.current.blur();
    navigation.push('Search');
  };
  return (
    <HomeScreenContainer>
      <Header />
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <View>
          <CustomInput
            ref={textBoxRef}
            paddingLeft={10}
            placeholder="검색어를 입력해주세요"
            onFocus={() => onFocusAction()}
          />
        </View>
        {/*<AComponent />*/}
        <CComponent />
        <DComponent />
        <EComponent />
        <FComponent />
        <GComponent />
        <HComponent />
        <Footer />
      </ScrollViewContainer>
    </HomeScreenContainer>
  );
};

const HomeScreenContainer = styled.SafeAreaView``;

const ScrollViewContainer = styled.ScrollView`
  margin: 0 15px 0 15px;
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

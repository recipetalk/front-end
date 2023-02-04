import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchInput from '../components/atoms/SearchInput';
import styled from 'styled-components';
import Header from '../components/organisms/Header';
import AComponent from '../components/templates/Home/AComponent';
import BComponent from '../components/templates/Home/BComponent';
import CComponent from '../components/templates/Home/CComponent';
import DComponent from '../components/templates/Home/DComponent';
import EComponent from '../components/templates/Home/EComponent';
import {ScrollView} from 'react-native';

const HomeScreen = () => {
  return (
    <HomeScreenContainer>
      <Header />
      <ScrollView>
        <SearchInput />
        <AComponent />
        <BComponent />
        <CComponent />
        <DComponent />
        <EComponent />
      </ScrollView>
    </HomeScreenContainer>
  );
};

const HomeScreenContainer = styled(SafeAreaView)``;
export default HomeScreen;

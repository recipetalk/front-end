import React from 'react';
import SearchInput from '../components/atoms/SearchInput';
import styled from 'styled-components/native';
import Header from '../components/organisms/Header';
import AComponent from '../components/templates/Home/AComponent';
import BComponent from '../components/templates/Home/BComponent';
import CComponent from '../components/templates/Home/CComponent';
import DComponent from '../components/templates/Home/DComponent';
import EComponent from '../components/templates/Home/EComponent';
import FComponent from '../components/templates/Home/FComponent';
import GComponent from '../components/templates/Home/GComponent';

const HomeScreen = () => {
  return (
    <HomeScreenContainer>
      <Header />
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <SearchInput />
        <AComponent />
        <BComponent />
        <CComponent />
        <DComponent />
        <EComponent />
        <FComponent />
        <GComponent />
      </ScrollViewContainer>
    </HomeScreenContainer>
  );
};

const HomeScreenContainer = styled.SafeAreaView``;

const ScrollViewContainer = styled.ScrollView`
  margin: 0 15px 0 15px;
`;
export default HomeScreen;

import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';

const PrepScreen = () => {
  return (
    <SafeAreaView>
      <IngredientsHeader title="손질법" />
    </SafeAreaView>
  );
};

export default PrepScreen;

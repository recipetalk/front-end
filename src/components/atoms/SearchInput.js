import React from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

const SearchInput = () => {
  return (
    <SafeAreaView>
      <CustomInput />
    </SafeAreaView>
  );
};

const CustomInput = styled(TextInput)`
  position: absolute;
  width: 324px;
  height: 44px;

  background: #ffffff;
  border: 1px solid #f09311;
  border-radius: 100px;
  margin-top: 18px;
`;
export default SearchInput;

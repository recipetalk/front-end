import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

const SearchInput = () => {
  return (
    <SafeAreaView>
      <CustomInput placeholder="검색어를 입력해주세요" />
    </SafeAreaView>
  );
};

const CustomInput = styled.TextInput`
  position: absolute;
  width: 100%;
  height: 44px;

  background: #ffffff;
  border: 1px solid #f09311;
  border-radius: 100px;
  margin-top: 18px;
`;
export default SearchInput;

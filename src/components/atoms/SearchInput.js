import React from 'react';
import styled from 'styled-components/native';

const SearchInput = () => {
  return (
    <SearchInputView>
      <CustomInput paddingLeft={10} placeholder="검색어를 입력해주세요" />
    </SearchInputView>
  );
};

const SearchInputView = styled.View``;

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
export default SearchInput;

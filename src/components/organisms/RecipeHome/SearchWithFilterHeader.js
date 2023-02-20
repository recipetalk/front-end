import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import SearchInput from '../../atoms/SearchInput';

const SearchWithFilterHeader = (props) => {
    return (
        <SearchHeaderContainer>
            <SearchInput />
            <ScrollViewContainer>
                
            </ScrollViewContainer>
        </SearchHeaderContainer>
    );
};

const SearchHeaderContainer = Platform.OS=="ios" ? styled.SafeAreaView`
    background: #F5F5F5;
    margin : 0 15px;
` : styled.View`
    background: #F5F5F5;
    margin : 0 15px;
` ;

const ScrollViewContainer = styled.ScrollView`
    horizontal: true;
`;

export default SearchWithFilterHeader;
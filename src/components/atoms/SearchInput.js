import React, {useState} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {addSearchItemToStorage} from '../../services/repository/SearchHistory';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSearchValue} from '../../store/search/SearchValue';

const SearchInput = ({nextNavigation}) => {
  const [value, setValue] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const enterAction = () => {
    addSearchItemToStorage(value);
    navigation.navigate(nextNavigation);
    dispatch(setSearchValue(value));
    setValue(null);
  };

  return (
    <SearchInputView>
      <InputBox>
        <CustomInput
          placeholder="검색어를 입력해주세요"
          value={value}
          onChangeText={setValue}
          clearButtonMode={'unless-editing'}
          placeholderTextColor="#a4a4a4"
          onSubmitEditing={enterAction}
          enterKeyHint={'search'}
        />
        <TouchableOpacity onPress={enterAction}>
          <SearchIcon source={require('../../assets/images/SearchIcon.png')} />
        </TouchableOpacity>
      </InputBox>
    </SearchInputView>
  );
};

const SearchInputView = styled.View`
  width: 100%;
`;
const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const InputBox = styled.View`
  position: relative;
  width: 100%;
  height: 44px;
  background: #ffffff;
  border: 1px solid #f09311;
  border-radius: 100px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 5%;
  padding-right: 5%;
  gap: 7px;
`;

const CustomInput = styled.TextInput`
  font-family: 'Pretendard Variable';
  flex: 1;
`;
export default SearchInput;

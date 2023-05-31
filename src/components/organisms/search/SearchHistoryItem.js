import React, {memo} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {
  addSearchItemToStorage,
  deleteSearchHistoryToStorage,
} from '../../../services/repository/SearchHistory';
import {setSearchValue} from '../../../store/search/SearchValue';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SearchHistoryItem = ({label, setUpdate, nextNavigation}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const removeAction = async () => {
    await deleteSearchHistoryToStorage(label);
    setUpdate(() => true);
  };

  const enterAction = async () => {
    await addSearchItemToStorage(label);
    await setUpdate(() => true);
    await dispatch(setSearchValue(label));
    await navigation.navigate(nextNavigation);
  };

  return (
    <Container>
      <TouchableOpacity onPress={enterAction}>
        <Label numberOfLines={1}>{label}</Label>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeAction}>
        <CancelImage source={require('../../../assets/images/Cancel.png')} />
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  width: 47%;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding-right: 2%;
  margin-top: 5px;
`;

const CancelImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const Label = styled.Text`
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  width: 100px;
`;

export default memo(SearchHistoryItem);

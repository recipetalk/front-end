import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  deleteAllSearchHistoryToStorage,
  loadSearchHistoryListFromStorage,
} from '../../../services/repository/SearchHistory';
import SearchHistoryItem from '../../organisms/search/SearchHistoryItem';
import {View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export const SearchHistoryComponent = ({nextNavigation}) => {
  const isFocused = useIsFocused();
  const [history, setHistory] = useState([]);
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    init();
  }, [isFocused]);

  useEffect(() => {
    console.log(isUpdate);
    if (isUpdate) {
      init();
      setUpdate(false);
    }
  }, [isUpdate]);

  const init = async () => {
    const historys = await loadSearchHistoryListFromStorage();
    console.log(historys);
    setHistory(() => historys);
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableBox
          onPress={async () => {
            await deleteAllSearchHistoryToStorage();
            init();
          }}>
          <TotalCategory>전체 삭제</TotalCategory>
        </TouchableBox>
      </View>
      <CustomScrollView>
        <Container>
          {history.map(data => (
            <SearchHistoryItem
              label={data.searchItem}
              setUpdate={setUpdate}
              nextNavigation={nextNavigation}
            />
          ))}
        </Container>
      </CustomScrollView>
    </>
  );
};

const TotalCategory = styled.Text`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Pretendard Variable';
  color: #a9a9a9;
`;

const TouchableBox = styled.TouchableOpacity`
  width: 70px;
`;

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CustomScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

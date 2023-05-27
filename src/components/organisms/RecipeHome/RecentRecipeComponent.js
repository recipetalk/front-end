import React from 'react';
import styled from 'styled-components/native';
import {FlatList, View} from 'react-native';
import BoardComponent from '../../atoms/board/BoardComponent';
import {useNavigation} from '@react-navigation/native';

export default function RecentRecipeComponent({navigation}) {
  const data = [1, 2, 3, 4];

  return (
    <FlatList
      data={data}
      renderItem={({item}) => renderItem(item, navigation)}
    />
  );
}

const renderItem = (item, navigation) => {
  return (
    <View>
      <BoardComponent navigation={navigation} />
      <HorizonalBar />
    </View>
  );
};

const HorizonalBar = styled.View`
  border: 3px solid #f5f5f5;
`;

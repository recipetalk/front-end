import React from 'react';
import styled from 'styled-components/native';
import {FlatList, View} from 'react-native';
import BoardComponent from '../../atoms/board/BoardComponent';

export default function RecentRecipeComponent() {
  const data = [1, 2, 3, 4];

  const renderItem = ({item}) => {
    const HorizonalBar = styled.View`
      border: 3px solid #f5f5f5;
    `;
    return (
      <View>
        <BoardComponent />
        <HorizonalBar />
      </View>
    );
  };

  return <FlatList data={data} renderItem={renderItem} />;
}

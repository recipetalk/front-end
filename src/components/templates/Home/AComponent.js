import React from 'react';
import AList from '../../organisms/Home/AList';
import {ScrollView} from 'react-native';

const AComponent = () => {
  const dummyData = [
    'Top 랭킹',
    '5분 레시피',
    '1월 혜택',
    '늘어나는 광고',
    'Top 랭킹',
    '5분 레시피',
    '1월 혜택',
    '늘어나는 광고',
  ];

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {dummyData.map((v, i) => {
        return <AList key={i} value={v} />;
      })}
    </ScrollView>
  );
};

export default AComponent;

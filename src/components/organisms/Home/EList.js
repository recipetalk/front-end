import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

const DATA = [
  {
    title: 1,
  },
  {
    title: 2,
  },
  {
    title: 3,
  },
  {
    title: 4,
  },
  {
    title: 5,
  },
  {
    title: 6,
  },
];

const Item = ({title}) => (
  <TestView>
    <TestText>{title}</TestText>
  </TestView>
);

const EList = props => {
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const TestView = styled.View`
  margin: auto;
  background-color: gray;
  margin-bottom: 20px;
  width: 156px;
  height: 156px;
  opacity: 0.3;
  border-radius: 7px;
`;

const TestText = styled.Text`
  color: black;
  font-size: 14px;
`;

export default EList;

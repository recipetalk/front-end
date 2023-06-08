import React from 'react';
import styled from 'styled-components/native';
import BottomImageComponent from '../BottomImageComponent';
import MiniBottomImageComponent from '../MiniBottomImageComponent';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const EList = props => {
  const navigation = useNavigation();
  return (
    <EListContainer>
      <TouchableOpacity
        onPress={() =>
          navigation.push('RecipeDetailScreen', {
            boardId: props?.value?.board?.boardId,
          })
        }>
        {props?.value?.thumbnailUri != null &&
        props?.value?.thumbnailUri != '' ? (
          <CustomView source={{uri: props?.value?.thumbnailUri}} />
        ) : (
          <CustomDummyView />
        )}
        <Title numberOfLines={2}>{props?.value?.board?.title}</Title>
        <Content numberOfLines={1}>{props?.value?.description}</Content>
      </TouchableOpacity>
      <Line />

      <View style={{position: 'absolute', bottom: -1}}>
        <MiniBottomImageComponent
          value={props.value?.board}
          isBookmark={false}
        />
      </View>
    </EListContainer>
  );
};

const EListContainer = styled.View`
  margin-right: 20px;
  position: relative;
  height: 200px;
`;

const CustomDummyView = styled.View`
  width: 200px;
  height: 100px;

  border-radius: 8px;
  border: 1px solid black;
  margin-bottom: 8px;
`;

const CustomView = styled.Image`
  width: 200px;
  height: 100px;

  border-radius: 8px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-family: 'Pretendard variable';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  width: 200px;
  color: #333333;
`;

const Content = styled.Text`
  margin-bottom: 15px;
  margin-top: 5px;
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
  width: 200px;
`;

const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
  width: 100%;
  bottom: 20px;
  position: absolute;
`;

export default EList;

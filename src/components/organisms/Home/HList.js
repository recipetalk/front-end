import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';

const HList = props => {
  return (
    <HListContainer>
      <Thumbnail />
      <Title>자취 8년차 된장찌개 맛있....</Title>
      <ImageInfoPart>
        <LikePart>
          <Image source={require('../../../assets/images/Like.png')} />
          <Text>10</Text>
        </LikePart>

        <CommentPart>
          <Image source={require('../../../assets/images/Comment.png')} />
          <Text>10</Text>
        </CommentPart>
      </ImageInfoPart>
    </HListContainer>
  );
};
const HListContainer = styled.View`
  margin-bottom: 16px;
`;

const Thumbnail = styled.View`
  width: 166px;
  height: 166px;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 8px;
  margin-right: 12px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: #666666;
  margin-bottom: 8px;
`;

const ImageInfoPart = styled.View`
  display: flex;
  flex-direction: row;
`;

const LikePart = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 14px;
`;

const CommentPart = styled.View`
  display: flex;
  flex-direction: row;
`;
export default HList;

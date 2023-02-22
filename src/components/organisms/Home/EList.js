import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';

const EList = props => {
  return (
    <EListContainer>
      <CustomView />
      <Text>[찌개요리] 자취 8년차 된장찌개</Text>
      <Text>맛있는 된장찌개의 비법은 쌈장입..</Text>
      <Line />

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
    </EListContainer>
  );
};

const EListContainer = styled.SafeAreaView`
  margin-right: 20px;
`;

const CustomView = styled.View`
  width: 200px;
  height: 100px;

  border-radius: 8px;
  border: 1px solid black;
`;

const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: gray;
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
export default EList;

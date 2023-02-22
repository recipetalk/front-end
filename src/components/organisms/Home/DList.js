import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';

const DList = props => {
  return (
    <DListContainer>
      <ImagePart />

      <InfoPart>
        <UserID>사용자아이디0000</UserID>
        <Titie>자취8년차 부대찌개 레시피 공...</Titie>
        <Content>레시피 설명 길어지면 이렇게 …</Content>

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
      </InfoPart>
    </DListContainer>
  );
};

const DListContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 12px;

  width: 360px;
  height: 124px;

  border-bottom-width: 4px;
  border-bottom-color: white;

  margin-bottom: 10px;
`;

const ImagePart = styled.View`
  width: 98px;
  height: 98px;
  border-radius: 8px;
  background-color: gray;
  opacity: 0.3;
`;

const InfoPart = styled.View`
  width: 205px;
  height: 98px;
`;

const UserID = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #acacac;
  margin-bottom: 10px;
`;

const Titie = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: #333333;
  margin-bottom: 5px;
`;

const Content = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #686868;
  margin-bottom: 10px;
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
export default DList;
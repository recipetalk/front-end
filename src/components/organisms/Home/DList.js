import React from 'react';
import styled from 'styled-components/native';
import BottomImageComponent from '../BottomImageComponent';

const DList = props => {
  return (
    <DListContainer>
      <ImagePart />

      <InfoPart>
        <Titie>{props.value.title}</Titie>
        <UserID>{props.value.nickname}</UserID>
        <BottomImageComponent value={props.value} isBookmark={false} />
      </InfoPart>
    </DListContainer>
  );
};

const DListContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 150px;
  padding: 18px;
  gap: 20px;
  border-bottom-width: 2px;
  border-bottom-color: #e1e1e1;
  background-color: #ffffff;
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
  font-family: 'Pretendard Variable';

  color: #acacac;
  margin-bottom: 35px;
`;

const Titie = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Pretendard Variable';

  color: #333333;
  margin-bottom: 5px;
`;

const Content = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Pretendard Variable';

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

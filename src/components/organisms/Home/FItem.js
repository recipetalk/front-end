import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';

const FItem = () => {
  const dummyTag = ['#한식', '#중식', '#일식'];

  return (
    <FItemContainer>
      <FItemImage />
      <Title>[찌개요리] 자취 8년차 된장찌개 맛있게 끓이는법</Title>
      <Content>
        안녕하세요 자취 8년차의 특별한 부대찌개 레시피를. 공개합니다. 여러분
        요리는 과학이에요. 레시피를 불과 8년차...
      </Content>
      <TagContainer>
        {dummyTag.map((v, i) => {
          return (
            <Tag key={i}>
              <TagText>{v}</TagText>
            </Tag>
          );
        })}
      </TagContainer>

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
    </FItemContainer>
  );
};

const FItemContainer = styled.View``;

const FItemImage = styled.View`
  width: 100%;
  height: 170px;

  border-radius: 8px;
  border: 1px solid black;
  margin: auto;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: #333333;
  margin-bottom: 8px;
`;

const Content = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  color: #666666;
  margin-bottom: 13px;
`;

const TagContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const Tag = styled.View`
  width: 49px;
  height: 23px;
  padding: 3px 9px;
  background: #ffffff;
  border: 1px solid #f09311;
  border-radius: 40px;

  margin-bottom: 13px;
`;

const TagText = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #f09311;
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
export default FItem;

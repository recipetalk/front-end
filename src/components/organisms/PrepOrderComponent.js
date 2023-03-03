import React from 'react';
import styled from 'styled-components/native';

const PrepOrderComponent = ({num}) => {
  return (
    <PrepOrderItem>
      <NumberPart>
        <NumberText>{num}</NumberText>
      </NumberPart>
      <InfoPart>
        <TextPart>
          {`2인분기준으로조리했으며 계랑은 밥숟가락과
종이컵입니다. 2인분기준으로조리했으며 계랑은 밥숟가락과 종이컵입니다. 2인분기준으로조리했으며 계랑은 밥숟가락과 종이컵입니다.`}
        </TextPart>

        <ImagePart />
        <TouchContainer>
          <MorePart>
            <MoreImg source={require('../../assets/images/Find_g.png')} />
            <MoreText>자세히보기</MoreText>
          </MorePart>
        </TouchContainer>
      </InfoPart>
    </PrepOrderItem>
  );
};

const PrepOrderItem = styled.View`
  display: flex;
  flex-direction: row;

  width: 350px;
  height: 280px;
  margin: auto;
  margin-bottom: 15px;
`;

const NumberPart = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f09311;
  border-radius: 50px;
  margin-right: 10px;
  justify-content: center;
`;

const NumberText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-align: center;

  color: #ffffff;
`;

const InfoPart = styled.View``;

const TextPart = styled.Text`
  width: 310px;
  height: 80px;
  margin-bottom: 10px;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  color: #666666;
`;

const ImagePart = styled.View`
  width: 310px;
  height: 140px;
  background-color: gray;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const MorePart = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: flex-end;
`;

const MoreText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: #a0a0a0;
`;

const MoreImg = styled.Image`
  width: 15px;
  height: 15px;
`;

const TouchContainer = styled.TouchableOpacity``;

export default PrepOrderComponent;

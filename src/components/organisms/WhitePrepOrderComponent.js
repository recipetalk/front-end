import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const PrepOrderComponent = ({num}) => {
  return (
    <PrepOrderItem>
      <InfoPart>
        <NumberPart>
          <NumberText>{num}</NumberText>
        </NumberPart>
        <TextPart>
          {`2인분기준으로조리했으며 계랑은 밥숟가락과
종이컵입니다. 2인분기준으로조리했으며 계랑은 밥숟가락과 종이컵입니다. 2인분기준으로조리했으며 계랑은 밥숟가락과 종이컵입니다.`}
        </TextPart>
      </InfoPart>
      <ImagePart />
    </PrepOrderItem>
  );
};

const PrepOrderItem = styled.View`
  width: 100%;
`;

const NumberPart = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f09311;
  border-radius: 50px;
  margin-right: 10px;
  margin-left: 5%;
  justify-content: center;
`;

const NumberText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  font-family: 'Pretendard Variable';
  color: #ffffff;
`;

const InfoPart = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const TextPart = styled.Text`
  width: 310px;
  font-family: 'Pretendard Variable';
  margin-bottom: 10px;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  color: #e1e1e1;
`;

const ImagePart = styled.View`
  width: 100%;
  height: 300px;
  background-color: gray;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export default PrepOrderComponent;

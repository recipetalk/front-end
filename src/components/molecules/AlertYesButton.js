import React from 'react';
import styled from 'styled-components/native';
import Alert from '../atoms/Alert';

export default function AlertYesButton({title, text, onPress}) {
  return (
    <Alert>
      <Inner>
        <TitlePart>{title}</TitlePart>
        {text !== undefined ? <TextPart>{text}</TextPart> : undefined}
      </Inner>
      <VerticalBar />
      <Button onPress={onPress}>
        <ButtonLabel>확인</ButtonLabel>
      </Button>
    </Alert>
  );
}

const VerticalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
`;

const Inner = styled.View`
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TextPart = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  text-align: center;
`;

const TitlePart = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;

  text-align: center;
  color: #333333;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const ButtonLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #f09311;
`;

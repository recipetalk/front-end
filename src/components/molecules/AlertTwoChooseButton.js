import React from 'react';
import styled from 'styled-components/native';
import Alert from '../atoms/Alert';
import {View} from 'react-native';

export default function AlertTwoChooseButton({
  title,
  text,
  firstPress,
  firstButtonText,
  secondPress,
  secondButtonText,
  setAlert,
}) {
  return (
    <Alert setAlert={setAlert}>
      <Inner>
        <TitlePart>{title}</TitlePart>
        <TextPart>{text}</TextPart>
      </Inner>
      <VerticalBar />
      <View style={{flexDirection: 'row'}}>
        <Button onPress={firstPress}>
          <YesButtonLabel>{firstButtonText}</YesButtonLabel>
        </Button>
        <HorizontalBar />
        <Button onPress={secondPress}>
          <YesButtonLabel>{secondButtonText}</YesButtonLabel>
        </Button>
      </View>
    </Alert>
  );
}
const HorizontalBar = styled.View`
  width: 1px;
  height: 100%;
  background: #d8d8d8;
`;

const VerticalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
`;

const Inner = styled.View`
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10%;
  padding-right: 10%;
`;

const TextPart = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
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
  width: 50%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const YesButtonLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #f09311;
`;

const NoButtonLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #666666;
`;

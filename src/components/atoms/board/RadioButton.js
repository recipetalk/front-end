import styled from 'styled-components/native';
import React from 'react';

export default function RadioButton({
  item,
  onPress,
  backgroundColor,
  clickedBackgroundColor,
  textColor,
  clickedTextColor,
  clickedNumber,
  borderColor,
  clickedBorderColor,
}) {
  const Button = styled.TouchableOpacity`
    height: 30px;
    width: 50px;
    background-color: ${() =>
      item.key === clickedNumber ? clickedBackgroundColor : backgroundColor};
    border-radius: 5px;
    margin: 0px 7px 15px 0px;
    border: ${() =>
      borderColor !== undefined && item.id === clickedNumber
        ? '1px solid ' + clickedBorderColor
        : borderColor === undefined
        ? 'none'
        : '1px solid ' + borderColor};
  `;
  const Label = styled.Text`
    font-weight: 700;
    color: ${() => (item.key === clickedNumber ? clickedTextColor : textColor)};
    text-align: center;
    line-height: 27px;
    font-family: 'Pretendard Variable';
  `;

  return (
    <Button onPress={onPress} item={item}>
      <Label>{item.title}</Label>
    </Button>
  );
}

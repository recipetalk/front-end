import React from 'react';
import styled from 'styled-components/native';

export default function ActiveButton({
  width,
  height,
  border_radius,
  isActive,
  LabelInfo,
  LabelSize,
  onPress,
}) {
  const Button = styled.TouchableOpacity`
        width: ${() => width}
        height: ${() => height}
        border-radius: ${() => border_radius}
        background-color: ${() => (isActive ? '#F09311' : '#E1E1E1')}
        align-items: center;
        justify-content: center;
    `;

  const Label = styled.Text`
    font-weight: 700;
    color: ${() => (isActive ? '#FFFFFF' : '#666666')};
    text-align: center;
    line-height: 27px;
    font-size: ${() => LabelSize};
  `;

  function notAction() {}

  return (
    <Button onPress={onPress !== undefined ? onPress : notAction}>
      <Label>{LabelInfo}</Label>
    </Button>
  );
}

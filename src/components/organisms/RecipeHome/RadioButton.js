import styled from 'styled-components/native';

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
      item.id === clickedNumber ? clickedBackgroundColor : backgroundColor};
    border-radius: 5px;
    margin: 0px 7px 15px 0px;
    border: ${() =>
      borderColor && item.id === clickedNumber
        ? '1px solid ' + clickedBorderColor
        : '1px solid ' + borderColor
        ? 'none'
        : borderColor};
  `;
  const Label = styled.Text`
    font-weight: 700;
    color: ${() => (item.id === clickedNumber ? clickedTextColor : textColor)};
    text-align: center;
    line-height: 30;
  `;

  return (
    <Button onPress={onPress} item={item}>
      <Label>{item.title}</Label>
    </Button>
  );
}

import React, {useState} from 'react';
import styled from 'styled-components/native';
import Alert from '../atoms/Alert';
import Checkbox from '@react-native-community/checkbox';

export default function AlertTutorialButton({
  title,
  text,
  onPress,
  setTutorialValid,
}) {
  const [isChecked, setChecked] = useState(false);

  const valueChangeHandler = value => {
    setChecked(value);
    setTutorialValid(value);
  };

  return (
    <Alert setAlert={onPress}>
      <Inner>
        <TitlePart>{title}</TitlePart>
        {text !== undefined ? <TextPart>{text}</TextPart> : undefined}
        <CheckBoxView>
          <RegisterIngredientsCheckbox
            value={isChecked}
            onFillColor="#F09311"
            tintColors={{true: '#F09311', false: '#A4A4A4'}}
            boxType="square"
            tintColor="#A4A4A4"
            onCheckColor="#FFFFFF"
            onTintColor="#F09311"
            disabled={false}
            onValueChange={valueChangeHandler}
          />
          <RegisterIngredientsText>다시 보지 않기</RegisterIngredientsText>
        </CheckBoxView>
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
  width: 90%;
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
const CheckBoxView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 15px;
`;
const RegisterIngredientsCheckbox = styled(Checkbox)`
  width: 22px;
  height: 22px;
`;
const RegisterIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

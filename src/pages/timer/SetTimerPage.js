import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Image, StyleSheet, TextInput} from 'react-native';

const SetTimerPage = ({navigation, route}) => {
  const [isHighlighted1, setHighlighted1] = useState(false);
  const [isHighlighted2, setHighlighted2] = useState(false);
  const [isHighlighted3, setHighlighted3] = useState(false);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const textInputRef = useRef(null);

  useEffect(() => {
    if (hour >= 24) {
      setHour(23);
      route.params.setHour(23);
    }
  }, [hour]);

  useEffect(() => {
    if (min >= 60) {
      setMin(59);
      route.params.setMinute(59);
    }
  }, [min]);

  useEffect(() => {
    if (sec >= 60) {
      setSec(59);
      route.params.setSecond(59);
    }
  }, [sec]);

  const moveCareAtEnd = e => {
    const textLength = e?.nativeEvent?.text?.length || 0;
    textInputRef.current?.setSelection(textLength, textLength);
  };

  return (
    <Container>
      <Header>
        <TouchableButton onPress={() => navigation.pop()}>
          <Image
            style={{
              width: 8.5,
              height: 17,
            }}
            source={require('../../assets/images/Back_w.png')}
          />
        </TouchableButton>
      </Header>

      <InputPart>
        <TextBoxPart>
          <TextInnerPart>
            <TextBoxLabel>시간</TextBoxLabel>
            <TextInput
              ref={textInputRef}
              onFocus={e => {
                setHighlighted1(true);
                moveCareAtEnd(e);
              }}
              onBlur={() => setHighlighted1(false)}
              style={[styles.textInput, isHighlighted1 && styles.isHighlighted]}
              keyboardType={'number-pad'}
              onChangeText={text => {
                setHour(text);
                route.params.setHour(text);
              }}
              defaultValue={'00'}
              inputMode={'decimal'}
              maxLength={2}
              value={hour}
            />
          </TextInnerPart>
          <Colon>:</Colon>
          <TextInnerPart>
            <TextBoxLabel>분</TextBoxLabel>
            <TextInput
              ref={textInputRef}
              onFocus={e => {
                setHighlighted2(true);
                moveCareAtEnd(e);
              }}
              onBlur={() => setHighlighted2(false)}
              style={[styles.textInput, isHighlighted2 && styles.isHighlighted]}
              defaultValue={'00'}
              autoFocus={true}
              keyboardType={'number-pad'}
              onChangeText={text => {
                setMin(text);
                route.params.setMinute(text);
              }}
              maxLength={2}
              inputMode={'decimal'}
              value={min}
            />
          </TextInnerPart>
          <Colon>:</Colon>
          <TextInnerPart>
            <TextBoxLabel>초</TextBoxLabel>
            <TextInput
              onFocus={e => {
                setHighlighted3(true);
                moveCareAtEnd(e);
              }}
              onBlur={() => setHighlighted3(false)}
              style={[styles.textInput, isHighlighted3 && styles.isHighlighted]}
              defaultValue={'00'}
              keyboardType={'number-pad'}
              onChangeText={text => {
                route.params.setSecond(text);
                setSec(text);
              }}
              maxLength={2}
              inputMode={'decimal'}
              value={sec}
            />
          </TextInnerPart>
        </TextBoxPart>
        <StartButton
          color={'#f5f5f5'}
          onPress={() => {
            if (sec == '') {
              setSec(0);
              route.params.setSecond(0);
            }
            if (min == '') {
              setMin(0);
              route.params.setMinute(0);
            }
            if (hour == '') {
              setHour(0);
              route.params.setHour(0);
            }

            navigation.goBack();
            route.params.setStart(true);
          }}>
          <ButtonLabel color={'#202020'}>시작</ButtonLabel>
        </StartButton>
      </InputPart>
    </Container>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    color: '#a0a0a0',
  },
  isHighlighted: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Pretendard Variable',
  },
});

const Header = styled.View`
  width: 90%;
  height: 50px;
  margin: 15px auto 0;
  flex-direction: row;
  justify-content: space-between;
`;

const Colon = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
`;

const TouchableButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;

  align-items: center;
  justify-content: center;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: #202020;
`;

const InputPart = styled.View`
  width: 90%;
  height: 260px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const TextBoxPart = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const TextInnerPart = styled.View`
  width: 30%;
  align-items: center;
`;

const TextBoxLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #d8d8d8;
  font-family: Pretendard Variable;
`;

const ButtonLabel = styled.Text`
  color: ${props => props.color};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  font-family: Pretendard Variable;
`;

const StartButton = styled.TouchableOpacity`
  background: ${props => props.color};
  width: 100px;
  height: 37px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export default SetTimerPage;

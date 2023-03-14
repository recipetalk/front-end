import React, {useState} from 'react';
import styled from 'styled-components/native';
import SequenceDetailDescription from '../components/atoms/board/SequenceDetailDescription';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

const SequenceDetailDescriptionScreen = ({navigation}) => {
  const [isClickedTimer, clickedTimer] = useState(false);
  const [isStartTimer, startTimer] = useState(false);
  const [isClickedStartTimer, clickedStartTimer] = useState(false);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [endTime, setEndTime] = useState(new Date());

  return (
    <SequenceDetailDescriptionContainer>
      <Header>
        <TouchableButton onPress={() => navigation.pop()}>
          <Image
            style={{
              width: 8.5,
              height: 17,
            }}
            source={require('../assets/images/Back_w.png')}
          />
        </TouchableButton>
        <TouchableButton onPress={() => clickedTimer(!isClickedTimer)}>
          {isClickedTimer ? (
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/images/timer_w.png')}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/images/timer_not.png')}
              resizeMode={'contain'}
            />
          )}
        </TouchableButton>
      </Header>
      <SequenceDetailDescription index={1} lastIndex={3} />
      {isClickedTimer && !isStartTimer ? (
        <InitTimerBox>
          <TextBoxPart>
            <TextInnerPart>
              <TextBoxLabel>시간</TextBoxLabel>
              <Text style={styles.isHighlighted}>{hour}</Text>
            </TextInnerPart>
            <Colon>:</Colon>
            <TextInnerPart>
              <TextBoxLabel>분</TextBoxLabel>
              <Text style={styles.isHighlighted}>{min}</Text>
            </TextInnerPart>
            <Colon>:</Colon>
            <TextInnerPart>
              <TextBoxLabel>초</TextBoxLabel>
              <Text style={styles.isHighlighted}>{sec}</Text>
            </TextInnerPart>
          </TextBoxPart>
          <StartButton
            color={'#f5f5f5'}
            onPress={() =>
              navigation.navigate('SetTimerPage', {
                setHour: setHour,
                setMinute: setMin,
                setSecond: setSec,
                setStart: startTimer,
              })
            }>
            <ButtonLabel color={'#202020'}>시작</ButtonLabel>
          </StartButton>
        </InitTimerBox>
      ) : isClickedTimer && isStartTimer ? (
        isClickedStartTimer ? (
          <StartTimerClickedBox>
            <TextBoxLabel>30분</TextBoxLabel>
            <TextBoxPart>
              <TextInnerPart>
                <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                  30
                </Text>
              </TextInnerPart>
              <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                :
              </Text>
              <TextInnerPart>
                <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                  00
                </Text>
              </TextInnerPart>
            </TextBoxPart>
            <TimerLabelBox>
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/bell.png')}
                style={{width: 11.37}}
              />
              <TimerLabel>오후 1시 : 13</TimerLabel>
            </TimerLabelBox>
            <View style={{flexDirection: 'row', gap: 50}}>
              <StartButton color={'#f5f5f5'}>
                <ButtonLabel color={'#202020'}>삭제</ButtonLabel>
              </StartButton>
              <StartButton color={'#202020'}>
                <ButtonLabel color={'#f5f5f5'}>일시정지</ButtonLabel>
              </StartButton>
            </View>
          </StartTimerClickedBox>
        ) : (
          <BarView onPress={() => clickedStartTimer(true)}>
            <Progress.Bar
              progress={500 / 1000}
              width={null}
              height={44}
              color={'rgba(240, 147, 17, 0.9)'}
              borderWidth={0}
              borderRadius={30}
            />
            <BarLabelBox>
              <TimerLabelBox>
                <Image
                  resizeMode={'contain'}
                  source={require('../assets/images/bell.png')}
                  style={{width: 11.37}}
                />
                <TimerLabel>오후 1시 : 13</TimerLabel>
              </TimerLabelBox>
              <BarLabel>20 : 11</BarLabel>
            </BarLabelBox>
          </BarView>
        )
      ) : undefined}
    </SequenceDetailDescriptionContainer>
  );
};
const styles = StyleSheet.create({
  isHighlighted: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    color: '#ffffff',
  },

  isStartClicked: {
    fontSize: 48,
  },
});

const Colon = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
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
  gap: 8px;
`;

const TextBoxLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #d8d8d8;
`;
const InitTimerBox = styled.View`
  position: absolute;
  width: 90%;
  height: 20%;
  justify-content: space-between;
  align-items: center;
  padding: 16px 10px;

  background: rgba(72, 72, 72, 0.9);
  border-radius: 30px;

  bottom: 11%;
  left: 5%;
`;

const ButtonLabel = styled.Text`
  color: ${props => props.color};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
`;

const StartButton = styled.TouchableOpacity`
  background: ${props => props.color};
  width: 100px;
  height: 37px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const StartTimerNotClickedBox = styled.View`
  position: absolute;
  width: 90%;
  height: 44px;
  left: 5%;
  bottom: 11%;
  background: rgba(72, 72, 72, 0.9);
  border-radius: 30px;
`;

const StartTimerClickedBox = styled.View`
  position: absolute;
  width: 90%;
  height: 30%;
  background: rgba(72, 72, 72, 0.9);
  bottom: 11%;
  left: 5%;
  border-radius: 30px;
  align-items: center;
  padding: 20px;
  gap: 15px;
`;

const Header = styled.View`
  width: 90%;
  height: 50px;
  margin: 15px auto 0;
  flex-direction: row;
  justify-content: space-between;
`;

const TouchableButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;

  align-items: center;
  justify-content: center;
`;

const SequenceDetailDescriptionContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: #202020;
`;

const BarView = styled.TouchableOpacity`
  width: 90%;
  left: 5%;
  bottom: 14%;
  height: 44px;
  position: relative;
  background: rgba(72, 72, 72, 0.9);
  border-radius: 30px;
  padding: 0;
`;

const BarLabelBox = styled.View`
  position: absolute;
  flex-direction: row;
  width: 85%;
  height: 100%;
  left: 7.5%;
  justify-content: space-between;
  align-items: center;
`;

const BarLabel = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  width: auto;
`;

const TimerLabelBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const TimerLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #d8d8d8;
`;

export default SequenceDetailDescriptionScreen;

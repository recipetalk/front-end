import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import SequenceDetailDescription from '../components/atoms/board/SequenceDetailDescription';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {current} from '@reduxjs/toolkit';

const SequenceDetailDescriptionScreen = ({navigation}) => {
  const [isClickedTimer, clickedTimer] = useState(false);
  const [isStartTimer, startTimer] = useState(false);
  const [isClickedStartTimer, clickedStartTimer] = useState(false);
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [oneMore, setOneMore] = useState(true);
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [estimatedEndTime, setEstimatedEndTime] = useState(null);
  const [init, setInit] = useState(true);

  useEffect(() => {
    let intervalId = null;
    if (isStartTimer && oneMore) {
      const currentTime = new Date().getTime();
      const duration =
        Number.parseInt(hour) * 60 * 60 +
        Number.parseInt(min) * 60 +
        Number.parseInt(sec);
      setRemainingTime(remainingTime => duration * 1000);
      setEstimatedEndTime(estimatedEndTime => currentTime + duration * 1000);
      setOneMore(() => false);
    }
    if (isStartTimer) {
      intervalId = setInterval(() => {
        setRemainingTime(remainingTime =>
          remainingTime > 0 ? remainingTime - 1000 : 0,
        );
        if (remainingTime === 0) {
          startTimer(false);
          cancelTimer();
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isStartTimer, remainingTime]);

  const pauseTimer = () => {
    setEstimatedEndTime(() => Date.now() + remainingTime);
    setHour(hoursLeft);
    setMin(minutesLeft);
    setSec(secondsLeft);
    setInit(false);
    startTimer(false);
  };

  const cancelTimer = () => {
    clickedTimer(false);
    startTimer(false);
    clickedStartTimer(false);
    setHour('00');
    setMin('00');
    setSec('00');
    setOneMore(true);
    setEndTime(null);
    setRemainingTime(null);
    setEstimatedEndTime(null);
    setInit(true);
  };

  const hoursLeft = Math.floor(remainingTime / 3600 / 1000);
  const minutesLeft = Math.floor(
    (remainingTime - hoursLeft * 3600 * 1000) / 60 / 1000,
  );
  const secondsLeft = Math.floor(
    (remainingTime - hoursLeft * 3600 * 1000 - minutesLeft * 60 * 1000) / 1000,
  );

  const formatTime = time => {
    return time < 10 ? '0' + time : time;
  };

  const getFormattedTime = time => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 예상 종료 시간이 오전인지 오후인지 판단하여 suffix 변수에 저장
    const suffix = hours >= 12 ? '오후' : '오전';

    // 12시간제로 변경
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // 시간, 분, 초, suffix를 결합하여 문자열 생성
    return `${formattedHours}:${formattedMinutes} ${suffix}`;
  };

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
            onPress={() => {
              !init
                ? startTimer(true)
                : navigation.navigate('SetTimerPage', {
                    setHour: setHour,
                    setMinute: setMin,
                    setSecond: setSec,
                    setStart: startTimer,
                    hour: hour,
                    min: min,
                    sec: sec,
                  });
            }}>
            <ButtonLabel color={'#202020'}>시작</ButtonLabel>
          </StartButton>
        </InitTimerBox>
      ) : isClickedTimer && isStartTimer ? (
        isClickedStartTimer ? (
          <StartTimerClickedBox>
            <TextBoxLabel>
              {hour == 0 ? undefined : Number.parseInt(hour) + '시  '}
              {min == 0 ? undefined : Number.parseInt(min) + '분  '}
              {sec == 0 ? undefined : Number.parseInt(sec) + '초'}
            </TextBoxLabel>
            <TextBoxPart>
              {hoursLeft !== 0 ? (
                <TextInnerPart>
                  <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                    {formatTime(hoursLeft)}
                  </Text>
                </TextInnerPart>
              ) : undefined}
              {hoursLeft !== 0 ? (
                <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                  :
                </Text>
              ) : undefined}
              <TextInnerPart>
                <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                  {formatTime(minutesLeft)}
                </Text>
              </TextInnerPart>
              <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                :
              </Text>
              <TextInnerPart>
                <Text style={[styles.isHighlighted, styles.isStartClicked]}>
                  {formatTime(secondsLeft)}
                </Text>
              </TextInnerPart>
            </TextBoxPart>
            <TimerLabelBox>
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/bell.png')}
                style={{width: 11.37}}
              />
              <TimerLabel>{getFormattedTime(estimatedEndTime)}</TimerLabel>
            </TimerLabelBox>
            <View style={{flexDirection: 'row', gap: 50}}>
              <StartButton color={'#f5f5f5'} onPress={cancelTimer}>
                <ButtonLabel color={'#202020'}>삭제</ButtonLabel>
              </StartButton>
              <StartButton color={'#202020'} onPress={pauseTimer}>
                <ButtonLabel color={'#f5f5f5'}>일시정지</ButtonLabel>
              </StartButton>
            </View>
          </StartTimerClickedBox>
        ) : (
          <BarView onPress={() => clickedStartTimer(true)}>
            <Progress.Bar
              progress={
                1 -
                remainingTime /
                  1000 /
                  (Number.parseInt(hour) * 60 * 60 +
                    Number.parseInt(min) * 60 +
                    Number.parseInt(sec))
              }
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
                <TimerLabel>{getFormattedTime(estimatedEndTime)}</TimerLabel>
              </TimerLabelBox>
              <BarLabel>
                {hoursLeft != 0 ? formatTime(hoursLeft) + ':' : undefined}
                {formatTime(minutesLeft)}:{formatTime(secondsLeft)}
              </BarLabel>
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
    fontFamily: 'Pretendard Variable',
  },

  isStartClicked: {
    fontSize: 40,
  },
});

const Colon = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  font-family: 'Pretendard Variable';
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
  font-family: 'Pretendard Variable';
  gap: 5px;
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
  font-family: 'Pretendard Variable';
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
  height: auto;
  background: rgba(72, 72, 72, 0.9);
  bottom: 11%;
  left: 5%;
  border-radius: 30px;
  align-items: center;
  padding: 20px;
  gap: 8px;
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
  font-family: 'Pretendard Variable';
`;

const TimerLabelBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

export default SequenceDetailDescriptionScreen;

const TimerLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #d8d8d8;
`;

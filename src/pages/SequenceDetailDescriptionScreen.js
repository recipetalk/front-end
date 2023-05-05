import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import SequenceDetailDescription from '../components/atoms/board/SequenceDetailDescription';
import {
  AppState,
  BackHandler,
  Image,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import BackgroundTimer from 'react-native-background-timer';
import AlertYesNoButton from '../components/molecules/AlertYesNoButton';
import notifee from '@notifee/react-native';
import {useFocusEffect} from '@react-navigation/native';

const SequenceDetailDescriptionScreen = ({navigation}) => {
  const [isClickedTimer, clickedTimer] = useState(false);
  const [isStartTimer, startTimer] = useState(false);
  const [isClickedStartTimer, clickedStartTimer] = useState(false);
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [oneMore, setOneMore] = useState(true);
  const [remainingTime, setRemainingTime] = useState(null);
  const [estimatedEndTime, setEstimatedEndTime] = useState(null);
  const [init, setInit] = useState(true);
  const [backgroundTime, setBackgroundTime] = useState(0);
  const appState = useRef(AppState.currentState);
  const [state, setState] = useState(appState.current);
  const [intervalId, setIntervalId] = useState(null);
  const [isAlert, setAlert] = useState(false);

  const Timer = NativeModules.Timer;
  const TimerModule = NativeModules.TimerModule;

  //뒤로가기 핸들러
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      backAction(),
    );

    return () => backHandler.remove();
  });

  const backAction = () => {
    if (isStartTimer) {
      setAlert(true);
      return true;
    } else {
      navigation.pop();
      return false;
    }
  };

  useEffect(() => {
    if (isStartTimer && oneMore) {
      const currentTime = new Date().getTime();
      const duration =
        Number.parseInt(hour) * 60 * 60 +
        Number.parseInt(min) * 60 +
        Number.parseInt(sec);
      setRemainingTime(() => duration * 1000);
      setEstimatedEndTime(() => currentTime + duration * 1000);
      setOneMore(() => false);
    }

    if (isStartTimer && remainingTime === 0) {
      cancelTimer();
      if (Platform.OS === 'ios') {
        TimerModule.endTimerActivity();
      }
    }
  }, [isStartTimer, remainingTime]);

  const duration = () => {
    const num =
      Number.parseInt(hour) * 60 * 60 +
      Number.parseInt(min) * 60 +
      Number.parseInt(sec);
    return num > 0 ? num : 1;
  };

  // startTimer 수정되면 시작하기. 알림 컨트롤러.
  useEffect(() => {
    if (isStartTimer) {
      if (hour == 0 && min == 0 && sec == 0) {
        return;
      }
      if (Platform.OS === 'ios') {
        notifee.setBadgeCount(1);
        TimerModule.startTimerActivity(duration());
        TimerModule.registerReservedNotification(duration());
      } else {
        Timer.showNotification(
          getFormattedTime(Date.now() + duration() * 1000),
        );
        //예약 알림 필요
        Timer.setReserveAlarm(duration() * 1000);
      }
      console.log('나야?');
      startAction();
    }
  }, [isStartTimer]);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      console.log('AppState : ', nextAppState);
      setState(nextAppState);
      AppState.currentState = nextAppState;
    };
    const eventHandler = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => eventHandler.remove();
  });

  //백그라운드 탐지
  useEffect(() => {
    if (isStartTimer) {
      if (state.match(/background/) || state.match(/inactive/)) {
        setBackgroundTime(() => Date.now());
        clearInterval(intervalId);
        setIntervalId(null);
        console.log(backgroundTime);
      } else {
        console.log(state);
        const delay = Math.round((Date.now() - backgroundTime) / 1000) * 1000;
        setRemainingTime(remainingTime => {
          TimerModule.updateTimerActivity((remainingTime - delay) / 1000);
          return remainingTime - delay;
        });
        setEstimatedEndTime(estimatedEndTime => estimatedEndTime - delay);
        console.log(backgroundTime);
        console.log(isStartTimer);
        console.log('여기서 한번더?');
        startAction();
        TimerModule.removeReservedNotification();
        TimerModule.registerReservedNotification(duration());
      }
    }
  }, [state]);

  const startAction = () => {
    if (intervalId === null) {
      console.log('나 도는중');
      setIntervalId(() =>
        setInterval(() => {
          setRemainingTime(remainingTime =>
            remainingTime > 0 ? remainingTime - 1000 : 0,
          );
        }, 1000),
      );
    }
  };

  useEffect(() => {
    if (isClickedStartTimer) {
      setTimeout(() => {
        clickedStartTimer(false);
      }, 6000);
    }
  }, [isClickedStartTimer]);

  const pauseTimer = () => {
    setEstimatedEndTime(() => Date.now() + remainingTime);
    setHour(hoursLeft);
    setMin(minutesLeft);
    setSec(secondsLeft);
    setInit(false);
    startTimer(false);
    deleteAlarm();
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const deleteAlarm = () => {
    if (Platform.OS === 'android') {
      Timer.deleteAlarm();
      Timer.deleteTimerNotification();
    } else {
      notifee.setBadgeCount(0);
      TimerModule.endTimerActivity();
      TimerModule.removeReservedNotification();
    }
  };

  const cancelTimer = () => {
    clickedTimer(() => false);
    startTimer(() => false);
    clickedStartTimer(() => false);
    setHour(() => '00');
    setMin(() => '00');
    setSec(() => '00');
    setOneMore(() => true);
    setRemainingTime(() => null);
    setEstimatedEndTime(() => null);
    setBackgroundTime(() => 0);
    setInit(() => true);
    clearInterval(intervalId);
    setIntervalId(() => null);
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
        <TouchableButton
          onPress={() => {
            if (isStartTimer) {
              setAlert(true);
            } else {
              navigation.pop();
            }
          }}>
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
              <StartButton
                color={'#f5f5f5'}
                onPress={() => {
                  deleteAlarm();
                  cancelTimer();
                }}>
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
              progress={1 - remainingTime / 1000 / duration()}
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
      {isAlert ? (
        <AlertYesNoButton
          setAlert={setAlert}
          yesButtonText={'나가기'}
          title={'타이머가 켜져있어요!'}
          text={'정말 나가시겠어요?\n\n나가시면 타이머가 꺼집니다!'}
          onPress={() => {
            pauseTimer();
            cancelTimer();
            navigation.pop();
          }}
        />
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

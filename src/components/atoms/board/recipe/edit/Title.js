import React from 'react';
import styled from 'styled-components/native';
import {Image, View} from 'react-native';
import ProgressBar from './ProgressBar';

const Title = ({totalStep, nowStep, navigation, nextNavigation}) => {
  return (
    <TitleContainer>
      <TitleInfoContainer>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <TouchContainer onPress={() => navigation.pop()}>
            <Image source={require('../../../../../assets/images/Back.png')} />
          </TouchContainer>
          <TitleLabel>글쓰기</TitleLabel>
        </View>
        <TouchContainer
          onPress={() =>
            totalStep === nowStep
              ? navigation.navigate('Home')
              : navigation.push(nextNavigation)
          }>
          <NextLabel>{totalStep === nowStep ? '저장' : '다음'}</NextLabel>
        </TouchContainer>
      </TitleInfoContainer>
      <ProgressBarContainer>
        <ProgressBar totalStep={totalStep} nowStep={nowStep} />
      </ProgressBarContainer>
    </TitleContainer>
  );
};

const TitleInfoContainer = styled.View`
  width: 90%;
  height: 100%;
  background: #ffffff;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressBarContainer = styled.View`
  width: 100%;
  height: 2px;
  background: #f5f5f5;
`;

const TitleContainer = styled.View`
  width: 100%;
  height: 50px;
  background: #ffffff;
`;

const TitleLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  margin-bottom: 2px;
`;

const NextLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #f09311;
  justify-content: center;
`;

const TouchContainer = styled.TouchableOpacity`
  margin-right: 10px;
  height: 100%;
  justify-content: center;
`;

export default Title;

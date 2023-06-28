import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {BackHandler, Image, View} from 'react-native';
import ProgressBar from './ProgressBar';
import AlertYesNoButton from '../../../../molecules/AlertYesNoButton';
import {useDispatch} from 'react-redux';
import {initRecipe} from '../../../../../store/RecipeEdit/TempRecipeEditInfoSlice';

const Title = ({
  totalStep,
  nowStep,
  navigation,
  nextNavigation,
  enabled = false,
  request = async () => {},
}) => {
  const [isAlert, setAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (nowStep === 1) {
      navigation.addListener('beforeRemove', e => {
        dispatch(initRecipe());
      });
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setAlert(true);
      },
    );

    return () => backHandler.remove();
  }, []);

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
          <TouchContainer
            onPress={() => {
              if (nowStep === 1) {
                setAlert(true);
              } else {
                navigation.pop();
              }
            }}>
            <Image source={require('../../../../../assets/images/Back.png')} />
          </TouchContainer>
          <TitleLabel>글쓰기</TitleLabel>
        </View>
        <TouchContainer
          disabled={!enabled}
          onPress={() => {
            if (totalStep !== nowStep) {
              navigation.push(nextNavigation);
            } else {
              //
              request();
              //
            }
          }}>
          <NextLabel enabled={enabled}>
            {totalStep === nowStep ? '저장' : '다음'}
          </NextLabel>
        </TouchContainer>
      </TitleInfoContainer>
      <ProgressBarContainer>
        <ProgressBar totalStep={totalStep} nowStep={nowStep} />
      </ProgressBarContainer>
      {isAlert ? (
        <AlertYesNoButton
          title={'정말 나가시겠어요?'}
          text={'이대로 나가시면 저장이 되지 않습니다.'}
          setAlert={setAlert}
          yesButtonText={'네'}
          onPress={() => {
            dispatch(initRecipe());
            navigation.pop();
          }}
        />
      ) : undefined}
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
  font-family: 'Pretendard Variable';
`;

const NextLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  ${props => (props.enabled ? '  color: #f09311' : ' color: #a1a1a1')};
  justify-content: center;
  font-family: 'Pretendard Variable';
`;

const TouchContainer = styled.TouchableOpacity`
  margin-right: 10px;
  height: 100%;
  justify-content: center;
`;

export default Title;

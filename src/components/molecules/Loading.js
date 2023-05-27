import React from 'react';
import styled from 'styled-components/native';
import Alert from '../atoms/Alert';
import {Dimensions, Image, Modal} from 'react-native';

export default function Loading() {
  return (
    <Modal transparent={true}>
      <BackgroundContainer>
        <Box>
          <Inner>
            <TitlePart>{'저장중'}</TitlePart>
            <Image
              style={{width: 100, height: 100}}
              source={require('../../assets/images/Spinner.gif')}
            />
          </Inner>
        </Box>
      </BackgroundContainer>
    </Modal>
  );
}

const Box = styled.View`
  width: 70%;
  height: auto;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  background-color: #ffffff;
  position: absolute;
  top: ${Dimensions.get('window').height / 3.5}px;
`;

const BackgroundContainer = styled.View`
  width: 100%;
  height: 120%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  align-items: center;
`;

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
  align-items: center;
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

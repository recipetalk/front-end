import React from 'react';
import styled from 'styled-components/native';
import WhitePrepOrderComponent from '../../organisms/WhitePrepOrderComponent';
import {Image} from 'react-native';

export default function SequenceDetailDescription({index, item, lastIndex}) {
  return (
    <SequenceDetailDescriptionContainer>
      {index !== 1 ? (
        <NavigationContainer>
          <NavigationLabel>
            STEP {index}{' '}
            <Image
              source={require('../../../assets/images/Community_SwipeUp_D8D.png')}
            />
          </NavigationLabel>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <NavigationLabel>요리 시작!</NavigationLabel>
        </NavigationContainer>
      )}
      <DescriptionContainer>
        <WhitePrepOrderComponent num={1} />
      </DescriptionContainer>
      {index !== lastIndex ? (
        <NavigationContainer>
          <NavigationLabel>
            STEP {index + 1}{' '}
            <Image
              source={require('../../../assets/images/Community_SwipeDown_D8D.png')}
            />{' '}
          </NavigationLabel>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <NavigationLabel>맛있는 요리 완성!</NavigationLabel>
        </NavigationContainer>
      )}
    </SequenceDetailDescriptionContainer>
  );
}

const DescriptionContainer = styled.ScrollView`
  width: 100%;
  height: 75%;
`;

const NavigationContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 60px;
  margin: 0 auto;
`;

const SequenceDetailDescriptionContainer = styled.View``;

const NavigationLabel = styled.Text`
  font-weight: 600;
  font-size: 16px;
  font-style: normal;

  font-family: 'Pretendard Variable';
  color: #e1e1e1;
`;

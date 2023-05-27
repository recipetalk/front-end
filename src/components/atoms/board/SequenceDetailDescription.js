import React, {useState} from 'react';
import styled from 'styled-components/native';
import WhitePrepOrderComponent from '../../organisms/WhitePrepOrderComponent';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function SequenceDetailDescription({index, item, lastIndex}) {
  const [num, setNum] = useState(index);
  const navigation = useNavigation();

  const afterPart = () => {
    if (num == lastIndex) {
      return;
    }
    setNum(num => num + 1);
  };

  const beforePart = () => {
    setNum(num => num - 1);
  };

  return (
    <SequenceDetailDescriptionContainer>
      {num !== 1 ? (
        <NavigationContainer onPress={() => beforePart()}>
          <NavigationLabel>
            STEP {num - 1}{' '}
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
        <WhitePrepOrderComponent num={num} item={item} />
      </DescriptionContainer>
      {num !== lastIndex ? (
        <NavigationContainer onPress={() => afterPart()}>
          <NavigationLabel>
            STEP {num + 1}{' '}
            <Image
              source={require('../../../assets/images/Community_SwipeDown_D8D.png')}
            />{' '}
          </NavigationLabel>
        </NavigationContainer>
      ) : (
        <NavigationContainer onPress={() => navigation.pop()}>
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

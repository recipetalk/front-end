import React from 'react';
import styled from 'styled-components/native';

const NavigatePartContainerComponent = ({navigation}) => {
  return (
    <NavigatePart>
      <NavigateContainer>
        <NavigateTouchButton>
          <NavigateIcon
            source={require('../../../assets/images/Recipe.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>나의 레시피</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>
      <NavigateContainer>
        <NavigateTouchButton>
          <NavigateIcon
            source={require('../../../assets/images/Ingredients.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>식재료 관리</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>
      <NavigateContainer>
        <NavigateTouchButton>
          <NavigateIcon
            source={require('../../../assets/images/Ingredients.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>재료 손질법 관리</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>
      <NavigateContainer>
        <NavigateTouchButton onPress={() => navigation.push('CommentHistory')}>
          <NavigateIcon
            source={require('../../../assets/images/BoardComment.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>덧글 내역</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>
    </NavigatePart>
  );
};

const NavigateContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NavigateTouchButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 130px;
  gap: 10px;
`;

const NavigateTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  color: black;
`;

const NavigateIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const NavigatePart = styled.View`
  width: 100%;
  height: auto;
  background: #ffffff;
  gap: 30px;
  padding: 20px;
`;
export default NavigatePartContainerComponent;

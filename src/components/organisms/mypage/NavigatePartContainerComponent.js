import React, {useState} from 'react';
import styled from 'styled-components/native';

const NavigatePartContainerComponent = ({navigation, setAlert}) => {
  return (
    <NavigatePart>
      <NavigateContainer>
        <NavigateTouchButton onPress={() => navigation.push('MyRecipe')}>
          <NavigateIcon
            source={require('../../../assets/images/Recipe_b.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>나의 레시피</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>

      <NavigateContainer>
        <NavigateTouchButton onPress={() => navigation.push('MyPrep')}>
          <NavigateIcon
            source={require('../../../assets/images/IngredientTrimming_b.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>재료 손질법 관리</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>

      <NavigateContainer>
        <NavigateTouchButton
          onPress={() => navigation.navigate('IngredientsHome')}>
          <NavigateIcon
            source={require('../../../assets/images/Ingredient_b.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>식재료 관리</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>

      <NavigateContainer>
        <NavigateTouchButton onPress={() => navigation.push('MyBookmark')}>
          <NavigateIcon
            source={require('../../../assets/images/Bookmark_b.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>나의 북마크</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>

      <NavigateContainer>
        <NavigateTouchButton onPress={() => navigation.push('MyLike')}>
          <NavigateIcon
            source={require('../../../assets/images/Like_b.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>좋아요 한 게시글</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>

      <NavigateContainer>
        <NavigateTouchButton onPress={() => navigation.push('BlockUser')}>
          <NavigateIcon
            source={require('../../../assets/images/block.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>차단한 사용자 관리</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>

      <NavigateContainer>
        <NavigateTouchButton onPress={() => navigation.push('CommentHistory')}>
          <NavigateIcon
            source={require('../../../assets/images/Comment_b.png')}
            resizeMode={'contain'}
          />
          <NavigateTitle>덧글 내역</NavigateTitle>
        </NavigateTouchButton>
      </NavigateContainer>

      <NavigateContainer>
        <NavigateTouchButton onPress={() => setAlert(true)}>
          <NavigateTitle style={{fontSize: 15, color: '#666666'}}>
            로그아웃
          </NavigateTitle>
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
  width: auto;
  gap: 10px;
  align-items: center;
`;

const NavigateTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  color: #333333;
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

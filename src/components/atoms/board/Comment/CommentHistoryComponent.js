import React from 'react';
import styled from 'styled-components/native';
import {Image, Text} from 'react-native';

const CommentHistoryComponent = ({navigation}) => {
  return (
    <Container>
      <InnerContainer>
        <DatePart>
          <Label>2023.10.22</Label>
          <Label>, 수정됨</Label>
        </DatePart>
        <TitlePart>
          <TitleLabel ellipsizeMode={'tail'} numberOfLines={1}>
            [찌개요리] 8년차 된장찌개 맛있게 끓이는 방법
          </TitleLabel>
          <NavigationContainer
            onPress={() => navigation.push('RecipeDetailScreen')}>
            <Image
              source={require('../../../../assets/images/More_b.png')}
              style={{width: 12, height: 12}}
              resizeMode={'contain'}
            />
          </NavigationContainer>
        </TitlePart>
        <DescriptionPart>
          <Description>
            밥해먹을게 생각나지않아서 오늘은 이거다!!생각하고 했는데 다들
            맛있다면서 잘먹네요 기분좋게 맛있게 한끼 클리어했습니다 감사합니다^^
          </Description>
        </DescriptionPart>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding-bottom: 5px;
  margin-bottom: 1px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const InnerContainer = styled.View`
  width: 90%;
  height: auto;
  gap: 5px;
`;

const DatePart = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

const Label = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
`;

const TitlePart = styled.View`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const DescriptionPart = styled.View`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background: #f5f5f5;
`;

const Description = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #666666;
`;

const NavigationContainer = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const TitleLabel = styled.Text`
  width: 80%;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #333333;
  font-family: 'Pretendard Variable';
`;

export default CommentHistoryComponent;

import React from 'react';
import styled from 'styled-components/native';
import {Image, Text} from 'react-native';
import {CalanderPrint} from '../../../../utils/CalanderPrint';

const CommentHistoryComponent = ({navigation, item}) => {
  return (
    <Container>
      <InnerContainer>
        <DatePart>
          <Label>{CalanderPrint(item.createdDate)}</Label>
        </DatePart>
        <TitlePart>
          <TitleLabel ellipsizeMode={'tail'} numberOfLines={1}>
            {item.title}
          </TitleLabel>
          <NavigationContainer
            onPress={() =>
              determineNavigation(
                item.boardSort,
                item.parentCommentId,
                item.boardId,
                navigation,
              )
            }>
            <Image
              source={require('../../../../assets/images/More_b.png')}
              style={{width: 12, height: 12}}
              resizeMode={'contain'}
            />
          </NavigationContainer>
        </TitlePart>
        <DescriptionPart>
          <Description>{item.description}</Description>
        </DescriptionPart>
      </InnerContainer>
      <HorizontalBar />
    </Container>
  );
};

const determineNavigation = async (
  boardSort,
  parentCommentId,
  boardId,
  navigation,
) => {
  if (boardSort === 'RECIPE') {
    await navigation.navigate('RecipeDetailScreen', {boardId: boardId});
  } else if (boardSort === 'TRIMMING') {
    await navigation.navigate('PrepDetail', {boardId: boardId});
  } else if (boardSort === 'DESCRIPTION') {
    await navigation.navigate('Efficacy', {boardId: boardId});
  }
  if (parentCommentId !== undefined) {
    await navigation.push('ReplyComment', {
      boardId: boardId,
      parentCommentId: parentCommentId,
    });
  }
};

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
  margin-top: 20px;
`;

const Container = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding-bottom: 5px;
  margin-bottom: 1px;
  padding-top: 10px;
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

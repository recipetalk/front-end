import React from 'react';
import styled from 'styled-components/native';
import {Image, View} from 'react-native';
import CommentHistoryComponent from '../../components/atoms/board/Comment/CommentHistoryComponent';

const CommentHistoryScreen = ({navigation}) => {
  return (
    <Container>
      <TitlePart>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <TouchContainer onPress={() => navigation.pop()}>
            <Image source={require('../../assets/images/Back.png')} />
          </TouchContainer>
          <TitleLabel>덧글 작성 내역</TitleLabel>
        </View>
      </TitlePart>
      <CommentHistoryPart>
        {[1, 2, 3, 4, 5].map(() => {
          return <CommentHistoryComponent navigation={navigation} />;
        })}
      </CommentHistoryPart>
    </Container>
  );
};

const CommentHistoryPart = styled.ScrollView`
  background: #e1e1e1;

  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: #ffffff;
`;

const TitlePart = styled.View`
  width: 90%;
  height: 50px;

  margin: 0 auto 1px;
  justify-content: center;
`;

const TouchContainer = styled.TouchableOpacity`
  margin-right: 10px;
  height: 100%;
  justify-content: center;
`;

const TitleLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  margin-bottom: 2px;
  font-family: 'Pretendard Variable';
`;

export default CommentHistoryScreen;

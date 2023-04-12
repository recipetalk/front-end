import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, Image, View} from 'react-native';
import CommentHistoryComponent from '../../components/atoms/board/Comment/CommentHistoryComponent';
import {getCommentHistory} from '../../services/MyPage';

const CommentHistoryScreen = ({navigation}) => {
  const [commentHistory, setCommentHistory] = useState([]);
  const [isLast, setLast] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const config = async () => {
      await getCommentHistory(pageNum)
        .then(res => {
          const data = JSON.parse(res.request._response);
          console.log(data.content);
          setCommentHistory(data.content);
          setLast(data.last);
          setTotalCount(data.totalElements);
          setPageNum(num => num++);
        })
        .catch(err => console.log(err.response));
    };
    config();
  }, []);

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
      <HorizontalBar />
      <FlatList
        data={commentHistory}
        renderItem={({item}) => (
          <CommentHistoryComponent navigation={navigation} item={item} />
        )}
      />
    </Container>
  );
};

const HorizontalBar = styled.View`
  width: 100%;
  height: 5px;
  background: #e1e1e1;
`;

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

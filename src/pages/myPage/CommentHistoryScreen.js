import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, FlatList, Image, View} from 'react-native';
import CommentHistoryComponent from '../../components/atoms/board/Comment/CommentHistoryComponent';
import {getCommentHistory} from '../../services/MyPage';

const CommentHistoryScreen = ({navigation}) => {
  const [commentHistory, setCommentHistory] = useState(null);
  const [isLast, setLast] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const config = async () => {
      await setLoading(true);
      await getCommentHistory(0)
        .then(res => {
          const data = JSON.parse(res.request._response);
          setCommentHistory(data.content);
          setLast(data.last);
          setTotalCount(data.totalElements);
          setPageNum(1);
        })
        .catch(err => console.log(err.response));
      await setLoading(false);
    };
    config();
  }, []);

  const request = async () => {
    await setLoading(true);
    await getCommentHistory(pageNum).then(res => {
      const json = JSON.parse(res.request._response);
      setLast(() => json.last);
      setCommentHistory(data => data.concat(json.content));
      setPageNum(pageNum => pageNum + 1);
    });
    await setLoading(false);
  };

  const onRefresh = async () => {
    if (!refresh) {
      setLoading(true);
      setRefresh(() => true);
      await getCommentHistory(0).then(res => {
        const json = JSON.parse(res.request._response);
        setLast(json.last);
        setCommentHistory(json.content);
        setTotalCount(json.totalElements);
        setPageNum(1);
      });
    }
    setLoading(false);
    setTimeout(() => setRefresh(false), 1000);
  };

  if (commentHistory == null) {
    return (
      <EmptyContainer>
        <ActivityIndicator color={'#f09311'} size={'large'} />
      </EmptyContainer>
    );
  }

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
          <TitleLabel>댓글 작성 내역</TitleLabel>
        </View>
      </TitlePart>
      <HorizontalBar height={5} />
      <TotalCountBox>
        <TotalCountLabel>내가 쓴 댓글 {totalCount}개</TotalCountLabel>
      </TotalCountBox>
      <HorizontalBar height={1} />
      <FlatList
        data={commentHistory}
        keyExtractor={_ => _.commentId}
        onRefresh={onRefresh}
        refreshing={refresh}
        onEndReached={() => {
          if (loading) {
            return;
          }
          if (!isLast) {
            request();
          }
        }}
        onEndReachedThreshold={0.6}
        renderItem={({item}) => (
          <CommentHistoryComponent navigation={navigation} item={item} />
        )}
      />
    </Container>
  );
};
const TotalCountBox = styled.View`
  width: 100%;
  height: 58px;
  justify-content: center;
  padding-left: 5%;
`;

const TotalCountLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: ${props => props.height}px;
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

const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
  margin-bottom: 70px;
`;

export default CommentHistoryScreen;

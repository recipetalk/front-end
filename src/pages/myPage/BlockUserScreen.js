import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {
  getBlockedUser,
  getFollower,
  requestRegisterBlockedUser,
  requestRemoveBlockUser,
} from '../../services/MyPage';

export const BlockUserScreen = ({navigation}) => {
  const [totalCount, setTotalCount] = useState(0);
  const [blockedUser, setBlockedUser] = useState(null);
  const [pagingNum, setPagingNum] = useState(0);
  const [isLast, setLast] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getBlockedUser(0)
      .then(res => {
        const json = JSON.parse(res.request._response);
        console.log(json);
        setPagingNum(1);
        setLast(json.last);
        setBlockedUser(json.content);
        setTotalCount(json.totalElements);
      })
      .catch(err => err.console.log(err));
  }, []);

  const request = async () => {
    await getBlockedUser(pagingNum)
      .then(res => {
        const json = JSON.parse(res.request._response);
        setLast(() => json.last);
        if (blockedUser.length === 0) {
          setBlockedUser(json.content);
        } else {
          setBlockedUser(data => [data, ...json.content]);
        }
        setPagingNum(pagingNum => pagingNum + 1);
      })
      .catch(err => console.log(err));
  };

  const onRefresh = async () => {
    if (!refresh) {
      setRefresh(() => true);
      await getBlockedUser(0)
        .then(res => {
          const json = JSON.parse(res.request._response);
          setLast(() => json.last);
          setBlockedUser(json.content);
          setPagingNum(1);
        })
        .catch(err => console.log(err));
      setTimeout(() => setRefresh(false), 1000);
    }
  };

  if (blockedUser == null) {
    return (
      <EmptyContainer>
        <ActivityIndicator color={'#f09311'} size={'large'} />
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <NavigationHeader title={'차단 사용자 목록'} navigation={navigation} />
      <HorizontalBar />
      {totalCount === 0 ? (
        <InnerContainer>
          <Text
            style={{
              fontStyle: 'normal',
              fontFamily: 'Pretendard Variable',
              fontSize: 14,
              fontWeight: 500,
              color: '#333333',
            }}>
            차단한 사용자가 없습니다.
          </Text>
        </InnerContainer>
      ) : (
        <FlatList
          data={blockedUser}
          renderItem={renderItem}
          keyExtractor={_ => _.username}
          onRefresh={onRefresh}
          refreshing={refresh}
          onEndReached={() => {
            if (!isLast) {
              request();
            }
          }}
          onEndReachedThreshold={0.6}
        />
      )}
    </Container>
  );
};

const renderItem = ({item}) => {
  return (
    <View style={{gap: 10, paddingTop: 10}}>
      <Profile
        username={item.username}
        description={item.description}
        profileURI={item.profileURI}
        nickname={item.nickname}
      />
      <HorizontalBar />
    </View>
  );
};

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

const InnerContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Profile = ({username, profileURI, nickname}) => {
  const [isBlocked, setBlocked] = useState(true);
  const requestDelete = async () => {
    await requestRemoveBlockUser(username)
      .then(res => setBlocked(false))
      .catch(err => console.log(err.response));
  };
  const requestRegister = async () => {
    await requestRegisterBlockedUser(username).then(res => setBlocked(true));
  };

  return (
    <SimpleProfile>
      <ProfileTouchableContainer>
        {profileURI != null && profileURI != '' ? (
          <ProfileImg source={{uri: profileURI}} />
        ) : (
          <ProfileDummyImage />
        )}
        <Nickname>{nickname}</Nickname>
      </ProfileTouchableContainer>
      <FollowingTouchableContainer
        onPress={() => {
          if (isBlocked) {
            requestDelete();
          } else {
            requestRegister();
          }
        }}>
        <Following>{isBlocked ? '차단해제' : '차단'}</Following>
      </FollowingTouchableContainer>
    </SimpleProfile>
  );
};

const ProfileImg = styled.Image`
  border-radius: 13.873px;
  background-color: #e5e5e5;
  width: 46px;
  height: 46px;
`;
const ProfileDummyImage = styled.View`
  border-radius: 13.873px;
  background-color: #e5e5e5;
  width: 46px;
  height: 46px;
`;
const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;

const SimpleProfile = styled.View`
  width: 90%;
  height: 46px;

  margin: auto auto;
`;

const ProfileTouchableContainer = styled.View`
  width: 70%;
`;

const Nickname = styled.Text`
  position: absolute;
  height: 19px;
  left: 60px;
  top: 3px;
  font-family: 'Pretendard Variable';
  color: #333333;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;

const FollowingTouchableContainer = styled.TouchableOpacity`
  position: absolute;
  top: 33%;
  right: 0px;
`;

const Description = styled.Text`
  align-items: center;
  padding: 0px;
  font-family: 'Pretendard Variable';
  color: #acacac;
  position: absolute;
  left: 60px;
  top: 25px;
`;

const Following = styled.Text`
  color: #f09311;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  text-align: right;
`;
const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
  margin-bottom: 70px;
`;

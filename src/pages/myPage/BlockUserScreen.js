import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import {FlatList, Text, View} from 'react-native';
import {getBlockedUser, getFollower} from '../../services/MyPage';

export const BlockUserScreen = ({navigation}) => {
  const [totalCount, setTotalCount] = useState(0);
  const [blockedUser, setBlockedUser] = useState([]);
  const [pagingNum, setPagingNum] = useState(0);
  const [isLast, setLast] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getBlockedUser(pagingNum)
      .then(res => {
        const json = JSON.parse(res.request._response);
        console.log(json);
        setPagingNum(pagingNum => pagingNum++);
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
        setPagingNum(pagingNum => pagingNum++);
      })
      .catch(err => console.log(err));
  };

  const onRefresh = async () => {
    if (!refresh) {
      setRefresh(() => true);
      setPagingNum(() => 0);
      await getBlockedUser(pagingNum)
        .then(res => {
          const json = JSON.parse(res.request._response);
          setLast(() => json.last);
          setBlockedUser(json.content);
          setPagingNum(pagingNum => pagingNum++);
        })
        .catch(err => console.log(err));
      setTimeout(() => setRefresh(false), 1000);
    }
  };

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

const Profile = ({username, description, profileURI, nickname}) => {
  const ProfileImg =
    profileURI !== undefined
      ? styled.Image`
          border-radius: 13.873px;
          background-color: #e5e5e5;
          width: 46px;
          height: 46px;
        `
      : styled.View`
          border-radius: 13.873px;
          background-color: #e5e5e5;
          width: 46px;
          height: 46px;
        `;
  return (
    <SimpleProfile>
      <ProfileTouchableContainer>
        <ProfileImg source={{uri: profileURI}} />
        <Nickname>{nickname}</Nickname>
        <Description numberOfLines={1} ellipsizeMode={'tail'}>
          {description}
        </Description>
      </ProfileTouchableContainer>
      <FollowingTouchableContainer>
        <Following>{'차단해제'}</Following>
      </FollowingTouchableContainer>
    </SimpleProfile>
  );
};

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

const ProfileTouchableContainer = styled.TouchableOpacity`
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

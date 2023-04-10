import React from 'react';
import styled from 'styled-components/native';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import {View} from 'react-native';

export const FollowingScreen = ({navigation}) => {
  const dummy = [
    {
      username: 'hi',
      description: 'test',
      profileURI: undefined,
      nickname: 'hihihi',
    },
    {
      username: 'hi',
      description: 'test',
      profileURI: undefined,
      nickname: 'hihihi',
    },
    {
      username: 'hi',
      description: 'test',
      profileURI: undefined,
      nickname: 'hihihi',
    },
    {
      username: 'hi',
      description: 'test',
      profileURI: undefined,
      nickname: 'hihihi',
    },
    {
      username: 'hi',
      description: 'test',
      profileURI: undefined,
      nickname: 'hihihi',
    },
  ];
  return (
    <Container>
      <NavigationHeader
        title={'모든 팔로잉 이웃 목록'}
        navigation={navigation}
      />
      <HorizontalBar />
      <InnerContainer>
        {dummy.map((k, v) => {
          return (
            <View style={{gap: 10, paddingTop: 10}}>
              <Profile
                username={k.username}
                description={k.description}
                profileURI={k.profileURI}
                nickname={k.nickname}
              />
              <HorizontalBar />
            </View>
          );
        })}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

const InnerContainer = styled.ScrollView``;

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
        <Following>{'팔로잉취소'}</Following>
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

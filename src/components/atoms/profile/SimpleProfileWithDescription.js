import React from 'react';
import styled from 'styled-components/native';

export default function SimpleProfileWithDescription({
  username,
  nickname,
  description,
  profileURI,
  navigation,
  isFollowing,
}) {
  //TODO : IMG URI 체킹할 방법 알아내야함.
  return (
    <SimpleProfile>
      <ProfileTouchableContainer
        onPress={() => navigation.push('ProfileScreen', {username: username})}>
        {profileURI != null && profileURI != '' ? (
          <ProfileImg source={{uri: profileURI}} />
        ) : (
          <ProfileImgDummy />
        )}
        <Nickname>{nickname}</Nickname>
        <Description numberOfLines={1} ellipsizeMode={'tail'}>
          {description}
        </Description>
      </ProfileTouchableContainer>
      <FollowingTouchableContainer>
        <Following>{'팔로잉'}</Following>
      </FollowingTouchableContainer>
    </SimpleProfile>
  );
}

const SimpleProfile = styled.View`
  width: 90%;
  height: 46px;

  margin: auto auto;
`;

const ProfileTouchableContainer = styled.TouchableOpacity`
  width: 70%;
`;

const ProfileImg = styled.Image`
  border-radius: 13.873px;
  background-color: #e5e5e5;
  width: 46px;
  height: 46px;
`;
const ProfileImgDummy = styled.View`
  border-radius: 13.873px;
  background-color: #e5e5e5;
  width: 46px;
  height: 46px;
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

const Description = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  font-family: 'Pretendard Variable';
  color: #acacac;
  position: absolute;
  left: 60px;
  top: 25px;
`;

const FollowingTouchableContainer = styled.TouchableOpacity`
  position: absolute;
  top: 33%;
  right: 0px;
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

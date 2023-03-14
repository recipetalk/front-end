import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

export default function SimpleProfileWithDescription({
  username,
  nickname,
  description,
  profileURI,
  isMine,
  navigation,
}) {
  const ProfileContainer = styled.View`
    position: relative;

    width: 100%;
    height: 72px;
  `;

  const SimpleProfile = styled.View`
    width: 90%;
    height: 46px;

    margin: auto auto;
  `;

  const ProfileTouchableContainer = isMine
    ? styled.View`
        width: 70%;
      `
    : styled.TouchableOpacity`
        width: 70%;
      `;

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

  const Nickname = styled.Text`
    position: absolute;
    height: 19px;
    left: 60px;
    top: 3px;

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

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    text-align: right;
  `;

  //TODO : IMG URI 체킹할 방법 알아내야함.
  return (
    <SimpleProfile>
      <ProfileTouchableContainer>
        <ProfileImg source={{uri: profileURI}} />
        <Nickname>{nickname}</Nickname>
        <Description numberOfLines={1} ellipsizeMode={'tail'}>
          {description}
        </Description>
      </ProfileTouchableContainer>
      <FollowingTouchableContainer
        onPress={isMine ? () => navigation.push('ProfileScreen') : undefined}>
        <Following>{isMine ? '프로필' : '소식받기'}</Following>
      </FollowingTouchableContainer>
    </SimpleProfile>
  );
}

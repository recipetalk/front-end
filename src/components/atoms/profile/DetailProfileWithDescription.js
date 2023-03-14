import React from 'react';
import styled from 'styled-components/native';
import {Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ActiveButton from '../board/ActiveButton';
import SimpleProfileWithDescription from './SimpleProfileWithDescription';
import FollowingComponent from '../../organisms/mypage/FollowingComponent';

export default function DetailProfileWithDescription({
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
    height: auto;

    align-items: center;
    gap: 15px;
    background-color: white;
    padding-bottom: 15px;
    padding-top: 20px;
  `;

  const SimpleProfile = styled.View`
    width: 90%;
    height: 46px;

    margin: 12.5px auto;
  `;

  const ProfileTouchableContainer = styled.View`
    width: 70%;
  `;

  const ProfileImg =
    profileURI !== undefined
      ? styled.Image`
          border-radius: 13.873px;
          background-color: #e5e5e5;
          width: 63px;
          height: 63px;
        `
      : styled.View`
          border-radius: 13.873px;
          background-color: #e5e5e5;
          width: 63px;
          height: 63px;
        `;

  const Nickname = styled.Text`
    color: #333333;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  `;

  const Description = styled.Text`
    text-align: center;
    width: 70%;
    color: #666666;
    margin-bottom: 10px;
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
  //TODO : 내아이디가 아니면 프로필 수정과 세팅, 내가 작성한 댓글, 기타 안뜨게 하기
  return (
    <ProfileContainer>
      <ProfileImg />
      <Nickname>{nickname}</Nickname>
      <Description>{description}</Description>

      <FollowingComponent
        followingNumber={123}
        followerNumber={'1K'}
        recipeNumber={22}
      />
    </ProfileContainer>
  );
}

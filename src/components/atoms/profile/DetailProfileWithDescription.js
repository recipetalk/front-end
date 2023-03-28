import React, {useState} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FollowingComponent from '../../organisms/mypage/FollowingComponent';

export default function DetailProfileWithDescription({
  username,
  nickname,
  description,
  profileURI,
  isMine,
  navigation,
}) {
  const [isFollowing, setFollowing] = useState(false);
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

  //TODO : IMG URI 체킹할 방법 알아내야함.
  //TODO : 내아이디가 아니면 프로필 수정과 세팅, 내가 작성한 댓글, 기타 안뜨게 하기
  return (
    <ProfileContainer>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <ProfileImg />
        <FollowingComponent
          followingNumber={123}
          followerNumber={'1K'}
          recipeNumber={22}
        />
      </View>

      <Nickname>{nickname}</Nickname>
      <Description>{description}</Description>
      {isMine ? (
        <CustomButton
          isActive={false}
          nonActive={true}
          labelTitle={'프로필 수정'}
        />
      ) : (
        <CustomButton
          isActive={!isFollowing}
          nonActive={isFollowing}
          labelTitle={isFollowing ? '이웃 취소' : '이웃 추가'}
        />
      )}
    </ProfileContainer>
  );
}

const CustomButton = ({isActive, nonActive, labelTitle}) => {
  return (
    <TouchableOpacity
      style={[
        styles.default,
        isActive && styles.isActive,
        nonActive && styles.nonActive,
      ]}>
      <Text
        style={[
          styles.defaultFont,
          isActive && styles.isActiveFont,
          nonActive && styles.nonActiveFont,
        ]}>
        {labelTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    width: '100%',
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isActive: {
    backgroundColor: '#f09311',
  },
  nonActive: {
    backgroundColor: '#ededed',
  },
  defaultFont: {
    fontFamily: 'Pretendard Variable',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
  },
  isActiveFont: {
    color: '#f5f5f5',
  },
  nonActiveFont: {
    color: '#333333',
  },
});

const ProfileContainer = styled.View`
  position: relative;
  width: 100%;
  height: auto;

  background-color: white;
  padding-bottom: 15px;
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
`;
const Nickname = styled.Text`
  color: #333333;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  margin-top: 20px;
`;

const Description = styled.Text`
  width: 80%;
  color: #666666;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 16px;
  line-height: 19px;
`;

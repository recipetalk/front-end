import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FollowingComponent from '../../organisms/mypage/FollowingComponent';
import {
  getSingleFollowing,
  requestRegisterFollowing,
  requestRemoveFollowing,
} from '../../../services/MyPage';

export default function DetailProfileWithDescription({
  profile,
  isMine,
  navigation,
  setFollow, // FollowingScreen에서 온 state.
}) {
  const [isFollowing, setFollowing] = useState(false);
  const [isRendering, setRendering] = useState(false);

  useEffect(() => {
    if (!isMine && profile.username) {
      setRendering(() => true);
      getSingleFollowing(profile.username)
        .then(res => {
          const json = JSON.parse(res.request._response);
          setFollowing(json.isFollowing);
          if (setFollow !== undefined) {
            setFollow(json.isFollowing);
          }
          setRendering(() => false);
        })
        .catch(err => console.log(err.response));
    }
  }, [isMine, profile.username]);

  const requestFollowing = () => {
    requestRegisterFollowing(profile.username).then(res => {
      setFollowing(true);
      setFollow(true);
    });
  };

  const requestCancelFollowing = () => {
    requestRemoveFollowing(profile.username)
      .then(res => {
        setFollowing(false);
        if (setFollow !== undefined) {
          setFollow(false);
        }
      })
      .catch(err => console.log(err.response));
  };

  //TODO : IMG URI 체킹할 방법 알아내야함.
  //TODO : 내아이디가 아니면 프로필 수정과 세팅, 내가 작성한 댓글, 기타 안뜨게 하기
  return (
    <ProfileContainer>
      <View style={{flexDirection: 'row', width: '100%'}}>
        {profile?.profileImg != null && profile?.profileImg !== '' ? (
          <ProfileImg source={{uri: profile.profileImg}} />
        ) : (
          <ProfileImgDummy />
        )}

        <View
          style={{
            width: '85%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FollowingComponent
            followingNumber={profile.followingNum}
            followerNumber={profile.followerNum}
            recipeNumber={profile.recipeNum}
            username={profile.username}
          />
        </View>
      </View>

      <Nickname>{profile.nickname}</Nickname>
      <Description numberOfLines={2}>{profile.description}</Description>
      {isMine ? (
        <CustomButton
          onPress={() => navigation.push('EditProfile')}
          isRendering={false}
          isActive={false}
          nonActive={true}
          labelTitle={'프로필 수정'}
        />
      ) : isRendering ? (
        <CustomButton
          isRendering={isRendering}
          isActive={!isRendering}
          nonActive={isRendering}
          labelTitle={'불러오는중'}
        />
      ) : (
        <CustomButton
          onPress={() => {
            if (isFollowing) {
              requestCancelFollowing();
            } else {
              requestFollowing();
            }
          }}
          isRendering={false}
          isActive={!isFollowing}
          nonActive={isFollowing}
          labelTitle={isFollowing ? '팔로잉 취소' : '팔로잉'}
        />
      )}
    </ProfileContainer>
  );
}

const CustomButton = ({
  isRendering,
  isActive,
  nonActive,
  labelTitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={isRendering}
      onPress={onPress}
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
  padding-bottom: 22px;
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
  margin-bottom: 30px;
  margin-top: 5px;
  font-size: 16px;
  line-height: 19px;
`;

const ProfileImg = styled.Image`
  border-radius: 13.873px;
  background-color: #e5e5e5;
  width: 63px;
  height: 63px;
`;

const ProfileImgDummy = styled.View`
  border-radius: 13.873px;
  background-color: #e5e5e5;
  width: 63px;
  height: 63px;
`;

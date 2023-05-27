import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getProfile} from '../../../services/MyPage';
import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import FollowingComponent from '../../organisms/mypage/FollowingComponent';
import NavigatePartContainerComponent from '../../organisms/mypage/NavigatePartContainerComponent';
import {RefreshControl} from 'react-native';
import {loadLoginFromStorage} from '../../../services/repository/AutoLogin';
import {useFocusEffect} from '@react-navigation/native';

const MypageComponent = ({navigation, setAlert}) => {
  const [profile, setProfile] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loadUsername, setLoadUsername] = useState();

  useEffect(() => {
    const init = async () => {
      // TODO : 아이디 리덕스에 저장 후? 가져오기?
      const getDataFromStorage = (await loadLoginFromStorage()).username;
      await setLoadUsername(getDataFromStorage);

      await getProfile(getDataFromStorage).then(res => {
        setProfile(JSON.parse(res.request._response));
      });
    };
    init();
  }, []);

  const getData = useCallback(() => {
    setRefreshing(true);
    getProfile(loadUsername)
      .then(res => {
        setProfile(JSON.parse(res.request._response));
        setTimeout(() => setRefreshing(false), 1000);
      })
      .catch(err => {
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      });
  }, [loadUsername]);
  // editProfile({nickname: 'test111',username: 'test',description: 'test333',profileImg: '',}).then(res => console.log(res.request));
  // getFollowUser('khj745700').then(res => { console.log(JSON.parse(res.request._response)); });
  // followUser().then(res => console.log(res.request.status));
  // unFollowUser().then(res => console.log(res));
  // blockUser({blockUsername:"test"}).then(res => console.log(res));
  // getBlockUser().then(res => console.log(res));

  const ProfileImg =
    profile.profileImg != null && profile.profileImg != ''
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
    <InnerContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getData} />
      }>
      <InfoContainer>
        <SimpleProfile>
          <ProfileTouchableContainer>
            <ProfileImg source={{uri: profile.profileImg}} />
            <Nickname>{profile.nickname}</Nickname>
            <Description numberOfLines={1} ellipsizeMode={'tail'}>
              {profile.description}
            </Description>
          </ProfileTouchableContainer>
          <FollowingTouchableContainer
            onPress={() =>
              navigation.push('ProfileScreen', {username: loadUsername})
            }>
            <Following>{'프로필'}</Following>
          </FollowingTouchableContainer>
        </SimpleProfile>
        <FollowingComponent
          followingNumber={profile.followingNum}
          followerNumber={profile.followerNum}
          recipeNumber={profile.recipeNum}
          username={loadUsername}
        />
      </InfoContainer>
      <VerticalBar height={'2px'} />
      <NavigatePartContainerComponent
        navigation={navigation}
        setAlert={setAlert}
      />
      {/*<VerticalBar height={'4px'} />*/}
      {/*<NoticePartComponent navigation={navigation} />*/}
    </InnerContainer>
  );
};
const VerticalBar = styled.View`
  width: 100%;
  height: ${props => props.height};
  background: #f5f5f5;
`;

const InfoContainer = styled.View`
  gap: 15px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const InnerContainer = styled.ScrollView`
  background: #ffffff;
  width: 100%;
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

export default MypageComponent;

import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getProfile} from '../../../services/MyPage';
import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import FollowingComponent from '../../organisms/mypage/FollowingComponent';
import NavigatePartContainerComponent from '../../organisms/mypage/NavigatePartContainerComponent';
import {RefreshControl} from 'react-native';
import {loadLoginFromStorage} from '../../../services/domain/AutoLogin';

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

  return (
    <InnerContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getData} />
      }>
      <VerticalBar height={'2px'} />
      <InfoContainer>
        <SimpleProfileWithDescription
          nickname={profile.nickname}
          description={profile.description}
          navigation={navigation}
          isMine={true}
        />
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

export default MypageComponent;

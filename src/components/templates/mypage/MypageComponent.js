import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getProfile} from '../../../services/MyPage';
import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import FollowingComponent from '../../organisms/mypage/FollowingComponent';
import NavigatePartContainerComponent from '../../organisms/mypage/NavigatePartContainerComponent';

const MypageComponent = ({navigation, setAlert}) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // TODO : 아이디 리덕스에 저장 후? 가져오기?
    getProfile('khj745700').then(res => {
      setProfile(JSON.parse(res.request._response));
    });
  }, []);

  // editProfile({nickname: 'test111',username: 'test',description: 'test333',profileImg: '',}).then(res => console.log(res.request));
  // getFollowUser('khj745700').then(res => { console.log(JSON.parse(res.request._response)); });
  // followUser().then(res => console.log(res.request.status));
  // unFollowUser().then(res => console.log(res));
  // blockUser({blockUsername:"test"}).then(res => console.log(res));
  // getBlockUser().then(res => console.log(res));

  return (
    <InnerContainer>
      <VerticalBar height={'2px'} />
      <InfoContainer>
        <SimpleProfileWithDescription
          nickname={profile.nickname}
          description={profile.description}
          navigation={navigation}
          isMine={true}
        />
        <FollowingComponent
          followingNumber={profile.followNum}
          followerNumber={profile.followNum}
          recipeNumber={profile.followNum}
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

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import DetailProfileWithDescription from '../../components/atoms/profile/DetailProfileWithDescription';
import {Image, View} from 'react-native';
import {RecipeAndTrimmingComponent} from '../../components/templates/mypage/RecipeAndTrimmingComponent';
import {getProfile} from '../../services/MyPage';
import {loadLoginFromStorage} from '../../services/domain/AutoLogin';

const ProfileScreen = ({navigation, route}) => {
  const [profile, setProfile] = useState({});
  const [loadUsername, setUsername] = useState('');
  const getUsername = async () => {
    const getUsernameInStorage = (await loadLoginFromStorage()).username;
    console.log(getUsernameInStorage);
    setUsername(() => getUsernameInStorage);
  };
  useEffect(() => {
    getProfile(route.params.username).then(res => {
      const data = JSON.parse(res.request._response);
      setProfile(data);
    });
    getUsername();
  }, []);

  return (
    <Container>
      <Header>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            paddingLeft: 10,
          }}>
          <HeaderTouchButton onPress={() => navigation.pop()}>
            <Image
              source={require('../../assets/images/Back.png')}
              resizeMode={'contain'}
            />
          </HeaderTouchButton>
          <HeaderLabel>{profile.nickname}</HeaderLabel>
        </View>
      </Header>
      <VerticalBar height={'1px'} />

      <InnerContainer>
        <DetailProfileWithDescription
          navigation={navigation}
          profile={profile}
          isMine={loadUsername === profile.username}
          setFollow={route.params.setFollowing}
        />
        <RecipeAndTrimmingComponent />
      </InnerContainer>
    </Container>
  );
};

const Header = styled.View`
  background: #ffffff;
  width: 100%;
  height: 50px;

  justify-content: center;
`;

const HeaderLabel = styled.Text`
  color: #333333;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
`;

const HeaderTouchButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

const VerticalBar = styled.View`
  width: 100%;
  height: ${props => props.height};
  background: #f5f5f5;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.ScrollView`
  width: 100%;
  height: auto;
`;

export default ProfileScreen;

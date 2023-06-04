import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import DetailProfileWithDescription from '../../components/atoms/profile/DetailProfileWithDescription';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
} from 'react-native';
import {RecipeAndTrimmingComponent} from '../../components/templates/mypage/RecipeAndTrimmingComponent';
import {getProfile} from '../../services/MyPage';
import {loadLoginFromStorage} from '../../services/repository/AutoLogin';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen = ({navigation, route}) => {
  const [profile, setProfile] = useState(null);
  const [loadUsername, setUsername] = useState('');
  const getUsername = async () => {
    const getUsernameInStorage = (await loadLoginFromStorage()).username;
    console.log(getUsernameInStorage);
    setUsername(() => getUsernameInStorage);
  };
  useFocusEffect(
    useCallback(() => {
      getProfile(route.params.username).then(res => {
        const data = JSON.parse(res.request._response);
        setProfile(data);
      });
      getUsername();
    }, [route.params.username]),
  );

  if (profile == null) {
    return (
      <EmptyContainer>
        <ActivityIndicator color={'#f09311'} size="large" />
      </EmptyContainer>
    );
  }

  return (
    <>
      <Container edges={['top']} />
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
        <RecipeAndTrimmingComponent username={route?.params?.username} />
      </InnerContainer>
    </>
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

const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
  margin-bottom: 70px;
`;

const Container = styled.SafeAreaView``;

const InnerContainer = props => {
  return (
    <FlatList
      contentContainerStyle={{}}
      data={[]}
      renderItem={null}
      ListEmptyComponent={null}
      keyExtractor={() => {}}
      ListHeaderComponent={<>{props.children}</>}
    />
  );
};

export default ProfileScreen;

import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import DetailProfileWithDescription from '../../components/atoms/profile/DetailProfileWithDescription';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {RecipeAndTrimmingComponent} from '../../components/templates/mypage/RecipeAndTrimmingComponent';
import {getProfile, requestRegisterBlockedUser} from '../../services/MyPage';
import {loadLoginFromStorage} from '../../services/repository/AutoLogin';
import {useFocusEffect} from '@react-navigation/native';
import {OptionModalChildImage} from '../../components/organisms/OptionModalChildImage';
import AlertYesNoButton from '../../components/molecules/AlertYesNoButton';
import {RecipeRemoveRequest} from '../../services/recipe/Recipe';
import {reportRecipe, reportUser} from '../../services/Report';
import {useToast} from 'react-native-toast-notifications';

const ProfileScreen = ({navigation, route}) => {
  const [profile, setProfile] = useState(null);
  const [loadUsername, setUsername] = useState('');
  const [checkedItem, setCheckedItem] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');
  const [isAlert, setAlert] = useState(false);
  const toast = useToast();
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

  useEffect(() => {
    if (checkedItem !== null) {
      checkedItem.onPress();
    }
  }, [checkedItem]);

  if (profile == null) {
    return (
      <EmptyContainer>
        <ActivityIndicator color={'#f09311'} size="large" />
      </EmptyContainer>
    );
  }

  const items = [
    {
      label: '사용자 신고하기',
      value: 'report',
      onPress: () => {
        setAlert(true);
        setAlertTitle('정말 신고하시겠습니까?');
        setAlertText('신중히 신고 해주시면 감사하겠습니다.');
      },
    },
    {
      label: '사용자 차단하기',
      value: 'block',
      onPress: () => {
        setAlert(true);
        setAlertTitle('정말 차단하시겠습니까?');
        setAlertText(
          '차단하게 되면 글 및 덧글, 프로필 모두 보이지 않게 됩니다.',
        );
      },
    },
  ];

  return (
    <>
      <Container edges={['top']} />
      <Header>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <HeaderTouchButton onPress={() => navigation.pop()}>
            <Image
              source={require('../../assets/images/Back.png')}
              resizeMode={'contain'}
            />
          </HeaderTouchButton>
          <HeaderLabel>{profile.nickname}</HeaderLabel>
        </View>
        {loadUsername !== profile.username ? (
          <OptionModalChildImage items={items} setCheckedItem={setCheckedItem}>
            <Image source={require('../../assets/images/More.png')} />
          </OptionModalChildImage>
        ) : undefined}
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
      {isAlert ? (
        <AlertYesNoButton
          title={alertTitle}
          setAlert={setAlert}
          yesButtonText={checkedItem.label}
          text={alertText}
          onPress={() => {
            if (checkedItem.value === 'report') {
              reportUser(profile.username).then(() => {
                setAlert(false);
                setTimeout(() => toast.show('정상적으로 신고되었습니다.'), 300);
              });
            } else if (checkedItem.value === 'block') {
              requestRegisterBlockedUser(profile.username).then(() => {
                setAlert(false);
                navigation.pop();
                setTimeout(
                  () => toast.show('사용자 차단이 완료되었습니다.'),
                  300,
                );
              });
            }
          }}
        />
      ) : undefined}
    </>
  );
};

const Header = styled.View`
  background: #ffffff;
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 4%;
  padding-right: 5%;
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

const Container = styled.SafeAreaView`
  background: white;
`;

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

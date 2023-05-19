import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import {Image, TouchableOpacity, View} from 'react-native';
import FocusedTextInputBorder from '../../components/atoms/FocusedTextInputBorder';
import ActiveButton from '../../components/atoms/board/ActiveButton';
import equals from '../../services/object/equals';
import {jsonAPI} from '../../services/connect/API';
import AlertYesButton from '../../components/molecules/AlertYesButton';
import AlertWithdraw from '../../components/molecules/AlertWithdraw';
import {
  loadProfileToStorage,
  saveProfileToStorage,
} from '../../services/repository/Profile';
import {ImageAndCameraFun} from '../../components/atoms/functions/ImageAndCameraFun';
import {useToast} from 'react-native-toast-notifications';
import {editProfile, getMyProfile} from '../../services/MyPage';

export const EditProfileScreen = ({navigation}) => {
  const [accessNickname, setAccessNickname] = useState('');
  const [localNickname, setLocalNickname] = useState('');
  const [localDescription, setLocalDescription] = useState('');
  const [accessDescription, setAccessDescription] = useState(null);
  const [isAccess, setAccess] = useState(true);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [isTryWithdraw, setTryWithdraw] = useState(false);
  const [isHighlight, setHighlight] = useState(false);
  const [loadPhoto, setLoadPhoto] = useState(null);
  const [cachePhoto, setCachePhoto] = useState({uri: null});
  const [isAlert, setAlert] = useState(false);
  const [isSendable, setSendable] = useState(false);
  const toast = useToast();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (localNickname !== accessNickname) {
      setAccess(false);
    } else {
      setAccess(true);
    }
  }, [localNickname]);

  useEffect(() => {
    console.log(!isAccess, cachePhoto.uri !== null, accessDescription !== null);
    if (!isAccess) {
      setSendable(false);
      return;
    }
    setSendable(cachePhoto.uri !== null || accessDescription !== null);
  }, [localNickname, isAccess, cachePhoto.uri, accessDescription]);

  const init = async () => {
    const loadProfile = await loadProfileToStorage();
    setLocalNickname(loadProfile.nickname);
    setAccessNickname(loadProfile.nickname);
    setAccess(true);
    setLocalDescription(loadProfile.description);
    setLoadPhoto(loadProfile.profileImageURI);
    console.log(loadProfile.profileImageURI);
  };

  const sendData = () => {
    editProfile(accessNickname, accessDescription, cachePhoto)
      .then(() =>
        getMyProfile().then(res => {
          const data = JSON.parse(res.request._response);
          console.log(data);
          saveProfileToStorage(
            data.nickname,
            data.description,
            data.profileImageURI,
          );
          navigation.goBack();
        }),
      )
      .catch(err => console.log(err.response));
  };

  const getIsValidNickname = async () =>
    jsonAPI
      .get('/auth/signup/nickname/' + localNickname)
      .then(response => {
        setAccess(true);
        setAccessNickname(localNickname);
        setVisibleAlert(true);
      })
      .catch(err => {
        setAccess(false);
        setAccessNickname(null);
        setVisibleAlert(true);
      });

  return (
    <Container>
      <ImageAndCameraFun
        isAlert={isAlert}
        setAlert={setAlert}
        setPhoto={setCachePhoto}
        toast={toast}
      />
      <View style={{position: 'relative', width: '100%'}}>
        <NavigationHeader navigation={navigation} title={'프로필 수정'} />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: '5%',
            height: '100%',
            justifyContent: 'center',
          }}
          disabled={!isSendable}
          onPress={() => sendData()}>
          <SaveLabel isAccess={isSendable}>완료</SaveLabel>
        </TouchableOpacity>
      </View>
      <HorizontalBar />

      {cachePhoto?.uri != null ? (
        <ImageBox
          imageStyle={{borderRadius: 27.444}}
          source={{uri: cachePhoto.uri}}
          resizeMode="cover">
          <ImageUpdate onPress={() => setAlert(true)}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../../assets/images/ProfileImgUpdate.png')}
            />
          </ImageUpdate>
        </ImageBox>
      ) : loadPhoto !== null ? (
        <ImageBox source={{uri: loadPhoto}} imageStyle={{borderRadius: 27.444}}>
          <ImageUpdate onPress={() => setAlert(true)}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../../assets/images/ProfileImgUpdate.png')}
            />
          </ImageUpdate>
        </ImageBox>
      ) : (
        <ImageBox>
          <ImageUpdate onPress={() => setAlert(true)}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../../assets/images/ProfileImgUpdate.png')}
            />
          </ImageUpdate>
        </ImageBox>
      )}

      <NicknamePart>
        <View>
          <NicknameLabel>닉네임</NicknameLabel>
        </View>

        <View style={{width: '100%', flexDirection: 'row', gap: 10}}>
          <View style={{width: '76%'}}>
            <FocusedTextInputBorder
              placeholder={accessNickname}
              placeholderTextColor="#a4a4a4"
              setData={setLocalNickname}
              value={localNickname}
            />
          </View>
          <ActiveButton
            width="80px"
            height="48px"
            border_radius="8px"
            LabelInfo={
              !equals(localNickname, accessNickname) ? '중복확인' : '확인완료'
            }
            LabelSize="14px"
            isActive={
              localNickname.length >= 1 &&
              !equals(localNickname, accessNickname)
            }
            onPress={getIsValidNickname}
          />
        </View>
      </NicknamePart>

      <NicknamePart>
        <NicknameLabel>자기소개</NicknameLabel>
        <DescriptionTextInput
          placeholder={localDescription}
          placeholderTextColor="#a4a4a4"
          multiline={true}
          scrollEnabled={false}
          onFocus={() => setHighlight(true)}
          onBlur={() => setHighlight(false)}
          isHighlight={isHighlight}
          onChangeText={text => {
            setAccessDescription(text);
          }}
          value={accessDescription}
          numberOfLines={2}
        />
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity onPress={() => setAccessDescription(() => null)}>
            <ClearLabel>지우기</ClearLabel>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{width: 100, marginTop: 100}}
          onPress={() => setTryWithdraw(true)}>
          <WidthdrawLabel>회원 탈퇴하기</WidthdrawLabel>
        </TouchableOpacity>
      </NicknamePart>

      {visibleAlert && isAccess ? (
        <AlertYesButton
          title={'사용할 수 있는 닉네임입니다 :)'}
          onPress={() => setVisibleAlert(false)}
        />
      ) : visibleAlert && !isAccess ? (
        <AlertYesButton
          title={'사용할 수 없는 닉네임입니다 :('}
          onPress={() => setVisibleAlert(false)}
        />
      ) : isTryWithdraw ? (
        <AlertWithdraw notAction={setTryWithdraw} navigation={navigation} />
      ) : undefined}
    </Container>
  );
};

const SaveLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: ${props => (props.isAccess ? '#f09311' : '#A4A4A4')};
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
  align-items: center;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;

const ImageBox = styled.ImageBackground`
  width: 90px;
  height: 90px;
  margin-top: 50px;
  background: #e5e5e5;
  border-radius: 27.444px;
  position: relative;
`;

const ImageUpdate = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const NicknameLabel = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  margin-left: 8px;
  color: #666666;
  margin-top: 15px;
`;

const NicknamePart = styled.View`
  width: 90%;
  gap: 10px;
`;

const DescriptionTextInput = styled.TextInput`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  height: 60px;
  text-align-vertical: top;
  font-family: 'Pretendard Variable';
  color: #666666;
  border: 1px solid ${props => (props.isHighlight ? '#333333' : '#e5e5e5')};
  border-radius: 8px;
  padding: 10px;
`;

const ClearLabel = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #999999;
`;

const WidthdrawLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  color: #a0a0a0;
`;

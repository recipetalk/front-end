import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React from 'react';
import {PermissionsAndroid, View} from 'react-native';
import AlertTwoChooseButton from '../../molecules/AlertTwoChooseButton';

export const ImageAndCameraFun = props => {
  return (
    <>
      {props.isAlert ? (
        <AlertTwoChooseButton
          title={'사진을 어떻게 가져올까요?'}
          text={'사진을 찍어도 되고 갤러리에서 가져올 수도 있어요!'}
          setAlert={props.setAlert}
          firstButtonText={'사진촬영'}
          firstPress={() => {
            launchCamera(
              {
                mediaType: 'photo',
                cameraType: 'back',
              },
              response => {
                if (response.didCancel) {
                  return null;
                } else {
                  props.setPhoto(() => response.assets[0]);
                  props.toast.show('사진이 정상적으로 등록되었습니다!');
                }
              },
            );
            props.setAlert(false);
          }}
          secondButtonText={'갤러리'}
          secondPress={async () => {
            launchImageLibrary({}, response => {
              if (response.didCancel) {
                return null;
              } else {
                console.log(response.assets[0]);
                props.setPhoto(() => response.assets[0]);
                props.toast.show('사진이 정상적으로 등록되었습니다!');
              }
              props.setAlert(false);
            });
          }}
        />
      ) : undefined}
      <View>{props.children}</View>
    </>
  );
};

const showPicker = async toast => {
  const grantedCamera = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: '카메라 권한 요청',
      message: '사진을 촬영하기 위한 카메라 권한이 필요합니다.',
      buttonNeutral: '나중에',
      buttonNegative: '취소',
      buttonPositive: '승인',
    },
  );

  const grantedstorage = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: '파일 권한 요청',
      message: '갤러리에 사진을 가져오기 위한 권한이 필요합니다. ',
      buttonNeutral: '나중에',
      buttonNegative: '취소',
      buttonPositive: '승인',
    },
  );
};

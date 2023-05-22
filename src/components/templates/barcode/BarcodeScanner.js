import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import AlertYesNoButton from '../../molecules/AlertYesNoButton';

const BarcodeScanner = () => {
  const navigation = useNavigation();
  const [scaned, setScaned] = useState(true);
  const [scanValue, setScanValue] = useState(null);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const ref = useRef(null);
  const isFocused = useIsFocused();

  useFocusEffect(() => {
    //컴포넌트 마운트 됬을 때
    if (!isAlertVisible) {
      setScaned(true);
    }

    return () => {
      //컴포넌트 언마운트 됬을 때 동작
      setScaned(false);
    };
  });

  const onBarCodeRead = event => {
    setScaned(() => false);
    Vibration.vibrate();
    //event.nativeEvent.codeStringValue가 바코드.
    setScanValue(event.nativeEvent.codeStringValue);
    setAlertVisible(true);
  };

  useEffect(() => {
    console.log('test');
    setAlertVisible(true);
    setScanValue(8809376328815);
  }, [isFocused]);

  console.log(isAlertVisible);

  const moveAndCloseAlert = () => {
    navigation.navigate('RegisterMyIngredients', {
      barcodeNumber: 8809376328815,
    });

    setTimeout(() => setAlertVisible(false), 500);
  };

  return (
    <View style={styles.container}>
      {scaned ? (
        <Camera
          style={styles.scanner}
          ref={ref}
          cameraType={CameraType.Back} // Front/Back(default)
          zoomMode={'on'}
          focusMode={'on'}
          // Barcode Scanner Props
          scanBarcode={true}
          showFrame={true}
          laserColor="#f09311"
          frameColor="white"
          surfaceColor="rgba(0, 0, 0, 0)"
          onReadCode={onBarCodeRead}
        />
      ) : undefined}
      {isAlertVisible ? (
        <AlertYesNoButton
          setAlert={setAlertVisible}
          onPress={moveAndCloseAlert}
          title={'바코드 확인'}
          text={`바코드 번호 \n${scanValue}가 맞나요?`}
          yesButtonText={'네!'}
        />
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  scanner: {flex: 1},
});
export default BarcodeScanner;

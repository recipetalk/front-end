import React, {useState} from 'react';
import {Image} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import styled from 'styled-components/native';
import {ImageAndCameraFun} from '../../atoms/functions/ImageAndCameraFun';

const IngredientsInfo = ({
  thumbnail,
  setThumbnailPhoto,
  isEdit,
  ingredientName,
}) => {
  const toast = useToast();
  const [isAlert, setAlert] = useState(false);

  const dataUpdatePhoto = () => value => {
    setThumbnailPhoto({photo: value});
  };

  const renderFunc = () => {
    if (isEdit) {
      return (
        <>
          <ImageSelectBox
            onPress={() => {
              setAlert(true);
            }}>
            <Image source={require('../../../assets/images/_격리_모드.png')} />
          </ImageSelectBox>
        </>
      );
    }

    if (thumbnail === undefined) {
      <ImageDummyView />;
    } else {
      return <ImageView source={{url: thumbnail}} />;
    }
  };

  return (
    <IngredientsInfoContainer>
      <ImageAndCameraFun
        toast={toast}
        setAlert={setAlert}
        isAlert={isAlert}
        setPhoto={dataUpdatePhoto()}
      />

      <IngredientsInfoSection>
        <IngredientsName>{ingredientName}</IngredientsName>
      </IngredientsInfoSection>
      {renderFunc()}
    </IngredientsInfoContainer>
  );
};

const IngredientsInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px;
  background-color: #ffffff;
`;

const IngredientsInfoSection = styled.View`
  justify-content: center;
`;

const IngredientsName = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  font-family: 'Pretendard Variable';

  color: #333333;
  margin-bottom: 10px;
`;

const IngredientsCategory = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  color: #666666;
`;

const ImageView = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: gray;
`;

const ImageDummyView = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: gray;
`;

const EditImageView = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  right: 18px;
  top: 18px;
  position: absolute;
  justify-content: center;
`;

const CameraImg = styled.Image`
  margin: auto;
`;

const ImageSelectBox = styled.TouchableOpacity`
  width: 98px;
  height: 98px;
  background: #ededed;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
export default IngredientsInfo;

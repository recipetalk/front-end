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
    if (thumbnail === undefined) {
      return <ImageDummyView />;
    }

    if (thumbnail === null || thumbnail === '') {
      return (
        <>
          <ImageSelectBox
            disabled={!isEdit}
            onPress={() => {
              setAlert(true);
            }}>
            {isEdit && (
              <Image
                source={require('../../../assets/images/Camera_Icon.png')}
              />
            )}
          </ImageSelectBox>
        </>
      );
    }

    return (
      <TouchContainer
        disabled={!isEdit}
        onPress={() => {
          setAlert(true);
        }}>
        <ImageView source={{url: thumbnail}} />
      </TouchContainer>
    );
  };

  return (
    <>
      <ImageAndCameraFun
        toast={toast}
        setAlert={setAlert}
        isAlert={isAlert}
        setPhoto={dataUpdatePhoto()}
      />
      <IngredientsInfoContainer>
        <IngredientsInfoSection>
          <IngredientsName>{ingredientName}</IngredientsName>
        </IngredientsInfoSection>
        {renderFunc()}
      </IngredientsInfoContainer>
    </>
  );
};

const IngredientsInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #ffffff;
`;

const IngredientsInfoSection = styled.View``;

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

const TouchContainer = styled.TouchableOpacity``;
export default IngredientsInfo;

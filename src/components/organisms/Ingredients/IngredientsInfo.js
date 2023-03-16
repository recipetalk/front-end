import React from 'react';
import styled from 'styled-components/native';

const IngredientsInfo = props => {
  return (
    <IngredientsInfoContainer>
      <TextView>
        <Name>마늘</Name>
        <Category>분류: 향신료 | 채소</Category>
      </TextView>
      {props.isEdit ? (
        <>
          <ImageView />
          <EditImageView>
            <CameraImg source={require('../../../assets/images/Camera.png')} />
          </EditImageView>
        </>
      ) : (
        <ImageView />
      )}
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

const TextView = styled.View`
  justify-content: center;
`;

const Name = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  font-family: 'Pretendard Variable';

  color: #333333;
  margin-bottom: 10px;
`;

const Category = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  color: #666666;
`;

const ImageView = styled.View`
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
export default IngredientsInfo;

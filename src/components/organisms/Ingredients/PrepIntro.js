import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import IngredientsInfo from './IngredientsInfo';
import {getEfficacy} from '../../../services/Ingredients';

const PrepIntro = props => {
  const [efficacyInfo, setEfficacyInfo] = useState({});

  useEffect(() => {
    getEfficacy(props.state.id)
      .then(res => {
        setEfficacyInfo(res.data);
      })
      .catch(error => console.error(error));
  }, [props.state.id]);

  return (
    <>
      <IngredientsInfo
        thumbnail={props.thumbnailPhoto.photo.uri}
        setThumbnailPhoto={props.setThumbnailPhoto}
        ingredientName={efficacyInfo.ingredientName}
        isEdit={true}
      />

      <PrepIntroContainer>
        <TitleInput
          placeholder={'제목'}
          multiline={false}
          value={props.state.title}
          onChangeText={res => props.setState({...props.state, title: res})}
          placeholderTextColor={'#a0a0a0'}
        />
        <PrepInput
          placeholder={`나만의 손질법을 소개해주세요.
예) 자취 8년차 언제 먹어도 질리지 않는 맛있는 된장찌개!`}
          multiline={true}
          value={props.state.desc}
          onChangeText={res => props.setState({...props.state, desc: res})}
          placeholderTextColor={'#a0a0a0'}
        />
      </PrepIntroContainer>
    </>
  );
};

const PrepIntroContainer = styled.View`
  padding: 18px;
`;

const TitleInput = styled.TextInput`
  width: 100%;
  margin-bottom: 10px;
  font-family: 'Pretendard Variable';
  font-size: 22px;
  color: #333333;
`;

const PrepInput = styled.TextInput`
  width: 100%;

  color: #666666;
  font-family: 'Pretendard Variable';
`;
export default PrepIntro;

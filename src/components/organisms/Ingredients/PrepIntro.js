import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getEfficacy} from '../../../services/Ingredients';
import IngredientsInfo from './IngredientsInfo';

const PrepIntro = props => {
  const [efficacyInfo, setEfficacyInfo] = useState({});

  useEffect(() => {
    getEfficacy(1)
      .then(res => {
        setEfficacyInfo(res.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <IngredientsInfo
        ingredientName={efficacyInfo.ingredientName}
        isEdit={true}
      />

      <PrepIntroContainer>
        <TitleInput
          placeholder={'제목'}
          multiline={true}
          value={props.state.title}
          onChangeText={res => props.setState({...props.state, title: res})}
        />
        <PrepInput
          placeholder={`나만의 손질법을 소개해주세요.
예) 자취 8년차 언제 먹어도 질리지 않는 맛있는 된장찌개!`}
          multiline={true}
          value={props.state.desc}
          onChangeText={res => props.setState({...props.state, desc: res})}
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
`;

const PrepInput = styled.TextInput`
  width: 100%;
  height: 50px;

  font-family: 'Pretendard Variable';
`;
export default PrepIntro;

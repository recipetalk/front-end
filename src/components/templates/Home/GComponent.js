import React from 'react';
import {Image} from 'react-native';

import styled from 'styled-components/native';

const GComponent = () => {
  return (
    <GComponentContainer>
      <TitleContainer>
        <Title>레시피톡 기획전</Title>
        <Image source={require('../../../assets/images/More_w.png')} />
      </TitleContainer>
    </GComponentContainer>
  );
};

const GComponentContainer = styled.View`
  margin: auto;
  width: 100%;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  height: 48px;
  background-color: #f09311;
  border-radius: 10px;
  margin-bottom: 100px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  color: #ffffff;
`;
export default GComponent;

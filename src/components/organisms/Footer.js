import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

const Footer = () => {
  return (
    <FooterContainer>
      <Bottom>광고 및 기타문의 : recipetalk1@naver.com</Bottom>
      <Bottom>Copyright 레시피톡. All Rights Reserved</Bottom>
      <Image source={require('../../assets/images/Logo_g.png')} />
    </FooterContainer>
  );
};

const FooterContainer = styled.View`
  width: 100%;
  height: 200px;
  padding-top: 15px;
  border-top-width: 1px;
  border-top-color: #e5e5e5;
  padding-left: 5%;
  padding-right: 5%;
  background: white;
`;

const Top = styled.Text`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  margin: 20px 0 13px;
  color: #868686;
  font-family: 'Pretendard Variable';
`;

const Bottom = styled.Text`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 5px;
  color: #868686;
  font-family: 'Pretendard Variable';
`;
export default Footer;

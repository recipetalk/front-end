import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';

const Footer = () => {
  return (
    <FooterContainer>
      <Top>
        레시피톡 소개 | 광고문의 | 개인정보처리방침 | 이용약관 | 고객센터
      </Top>
      <Bottom>서비스 이용문의 : 070-4896-6416</Bottom>
      <Bottom>Copyright 레시피톡. All Rights Reserved</Bottom>
      <Image source={require('../../assets/images/Logo_g.png')} />
    </FooterContainer>
  );
};

const FooterContainer = styled.View`
  width: 100%;
  height: 200px;

  border-top-width: 1px;
  border-top-color: black;
`;

const Top = styled.Text`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  margin: 20px 0 13px;
  color: #868686;
`;

const Bottom = styled.Text`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 5px;
  color: #868686;
`;
export default Footer;

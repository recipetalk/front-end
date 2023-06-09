import React from 'react';
import styled from 'styled-components/native';
import Header from '../../components/organisms/Header';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import WebView from 'react-native-webview';

export const MarketingHandlePolicyScreen = ({navigation}) => {
  return (
    <Container>
      <NavigationHeader title={'레시피톡'} navigation={navigation} />
      <WebView
        source={{
          uri: 'https://recipe-prod-s3.s3.ap-northeast-2.amazonaws.com/ToS/recipetalk_marketing_accept_v1.html',
        }}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

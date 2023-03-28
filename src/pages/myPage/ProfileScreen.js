import React from 'react';
import styled from 'styled-components/native';
import DetailProfileWithDescription from '../../components/atoms/profile/DetailProfileWithDescription';
import {Image, View} from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <Container>
      <Header>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            paddingLeft: 10,
          }}>
          <HeaderTouchButton onPress={() => navigation.pop()}>
            <Image
              source={require('../../assets/images/Back.png')}
              resizeMode={'contain'}
            />
          </HeaderTouchButton>
          <HeaderLabel>사용자아이디0000</HeaderLabel>
        </View>
      </Header>
      <VerticalBar height={'1px'} />

      <InnerContainer>
        <DetailProfileWithDescription
          navigation={navigation}
          nickname={'사용자아이디0000'}
          description={
            '4아이 엄마~^^ 소개합니다. 나의 레시피 1줄까지만 쓰게할까 테스트문구 테스트'
          }
          isMine={true}
        />
      </InnerContainer>
    </Container>
  );
};

const Header = styled.View`
  background: #ffffff;
  width: 100%;
  height: 50px;

  justify-content: center;
`;

const HeaderLabel = styled.Text`
  color: #333333;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
`;

const HeaderTouchButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

const VerticalBar = styled.View`
  width: 100%;
  height: ${props => props.height};
  background: #f5f5f5;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.ScrollView`
  width: 100%;
  height: auto;
`;

export default ProfileScreen;

import React from 'react';
import styled from 'styled-components/native';
import {Image, View} from 'react-native';
import SimpleProfileWithDescription from '../components/atoms/profile/SimpleProfileWithDescription';
import FollowingComponent from '../components/organisms/mypage/FollowingComponent';

const MypageScreen = ({navigation}) => {
  return (
    <MypageScreenContainer>
      <InnerContainer>
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
                source={require('../assets/images/Back.png')}
                resizeMode={'contain'}
              />
            </HeaderTouchButton>
            <HeaderLabel>마이페이지</HeaderLabel>
          </View>
        </Header>
        <VerticalBar height={'2px'} />
        <InfoContainer>
          <SimpleProfileWithDescription
            nickname="사용자아이디0000"
            description="4아이 엄마~^^ 소개합니다. 나의 레시피 1줄까지만 쓰게할까 테스트문구 테스트"
            navigation={navigation}
            isMine={true}
          />
          <FollowingComponent
            followingNumber={123}
            followerNumber={'1K'}
            recipeNumber={22}
          />
        </InfoContainer>
        <VerticalBar height={'2px'} />
        <NavigatePart>
          <NavigateContainer>
            <NavigateTouchButton>
              <NavigateIcon
                source={require('../assets/images/Recipe.png')}
                resizeMode={'contain'}
              />
              <NavigateTitle>나의 레시피</NavigateTitle>
            </NavigateTouchButton>
          </NavigateContainer>
          <NavigateContainer>
            <NavigateTouchButton>
              <NavigateIcon
                source={require('../assets/images/Ingredients.png')}
                resizeMode={'contain'}
              />
              <NavigateTitle>식재료 관리</NavigateTitle>
            </NavigateTouchButton>
          </NavigateContainer>
          <NavigateContainer>
            <NavigateTouchButton>
              <NavigateIcon
                source={require('../assets/images/Ingredients.png')}
                resizeMode={'contain'}
              />
              <NavigateTitle>재료 손질법 관리</NavigateTitle>
            </NavigateTouchButton>
          </NavigateContainer>
          <NavigateContainer>
            <NavigateTouchButton
              onPress={() => navigation.push('CommentHistory')}>
              <NavigateIcon
                source={require('../assets/images/BoardComment.png')}
                resizeMode={'contain'}
              />
              <NavigateTitle>덧글 내역</NavigateTitle>
            </NavigateTouchButton>
          </NavigateContainer>
        </NavigatePart>
        <VerticalBar height={'4px'} />
        <NoticePart>
          <NavigateTouchButton>
            <NoticeTitle>공지사항</NoticeTitle>
          </NavigateTouchButton>
          <NavigateTouchButton>
            <NoticeTitle>자주 묻는 질문</NoticeTitle>
          </NavigateTouchButton>
          <NavigateTouchButton>
            <NoticeTitle>기타</NoticeTitle>
          </NavigateTouchButton>
        </NoticePart>
      </InnerContainer>
    </MypageScreenContainer>
  );
};

const VerticalBar = styled.View`
  width: 100%;
  height: ${props => props.height};
  background: #f5f5f5;
`;

const InfoContainer = styled.View`
  gap: 15px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const HeaderTouchButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

const MypageScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

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

const InnerContainer = styled.ScrollView`
  background: #ffffff;
  width: 100%;
`;

const NavigatePart = styled.View`
  width: 100%;
  height: auto;
  background: #ffffff;
  gap: 30px;
  padding: 20px;
`;

const NavigateContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NavigateTouchButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 130px;
  gap: 10px;
`;

const NavigateTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  color: black;
`;

const NavigateIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const NoticePart = styled.View`
  width: 100%;
  background: #ffffff;
  margin-top: 3px;
  padding: 20px;
  gap: 20px;
`;

const NoticeTitle = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: black;
  font-family: 'Pretendard Variable';
`;
export default MypageScreen;

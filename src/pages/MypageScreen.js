import React from 'react';
import styled from 'styled-components/native';
import DetailProfileWithDescription from '../components/atoms/profile/DetailProfileWithDescription';
import {Dimensions} from 'react-native';

const MypageScreen = ({navigation}) => {
  return (
    <MypageScreenContainer>
      <InnerContainer>
        <Header>
          <HeaderLabel>프로필</HeaderLabel>
        </Header>

        <DetailProfileWithDescription
          nickname="홍길동"
          description="나는 사실 양아치"
          navigation={navigation}
          isMine={true}
        />

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
        <VerticalBar />
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
  height: 4px;
  background: #f5f5f5;
`;

const MypageScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  background: #f09311;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const HeaderLabel = styled.Text`
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`;

const InnerContainer = styled.ScrollView`
  background: #ffffff;
  width: 100%;
`;

const NavigatePart = styled.View`
  width: 100%;
  height: 165px;
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
`;
export default MypageScreen;

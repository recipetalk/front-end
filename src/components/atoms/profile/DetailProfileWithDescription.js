import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

export default function DetailProfileWithDescription({
  username,
  nickname,
  description,
  profileURI,
}) {
  const ProfileContainer = styled.View`
    width: 100%;
    height: 100%;
  `;

  const SimpleProfile = styled.View`
    width: 90%;
    margin: 15px auto 40px;
  `;

  const ProfileTouchableContainer = styled.View`
    width: 70%;
  `;

  const ProfileImg =
    profileURI !== undefined
      ? styled.Image`
          border-radius: 100;
          border: 1px solid black;
          width: 48px;
          height: 48px;
        `
      : styled.View`
          border-radius: 100px;
          border: 1px solid black;
          width: 48px;
          height: 48px;
        `;

  const Nickname = styled.Text`
    margin-top: 15px;
    color: #333333;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    bottom: 3px;
  `;

  const Description = styled.Text`
    color: #737373;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  `;

  const DescriptionContainer = styled.View`
    background: #ffffff;
    width: 100%;
    height: auto;
    padding: 15px;
    border: 1px solid #eeeeee;
    border-radius: 6px;

    margin-top: 15px;
  `;

  const FollowingTouchableContainer = styled.TouchableOpacity`
    position: absolute;
    top: 10%;
    right: 0px;
  `;

  const FollowingButtonLabel = styled.Text`
    color: #f09311;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    text-align: right;
  `;

  const FollowingNumLabel = styled.Text`
  
  `;

  const SettingImg = styled.Image`
    width: 20px;
    height: 20px;
  `;

  const VerticalBar = styled.View`
    height: 1px;
    background: #e1e1e1;
    width: 100%;
  `;

  const TouchableNaviContainer = styled.TouchableOpacity`
    width: 90%;
    height: 60px;
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  const NaviLabel = ({title, num}) => {
    return (
      <Text
        style={{
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 18,
          color: '#383838',
        }}>
        {title}    {num}개
      </Text>
    );
  };

  const NaviImg = styled.Image`
    width: 7px;
    height: 12px;
    flex
  `;

  //TODO : IMG URI 체킹할 방법 알아내야함.
  //TODO : 내아이디가 아니면 프로필 수정과 세팅, 내가 작성한 댓글, 기타 안뜨게 하기
  return (
    <ProfileContainer>
      <SimpleProfile>
        <ProfileTouchableContainer>
          <ProfileImg source={{uri: profileURI}} />
          <Nickname>{nickname}</Nickname>
        </ProfileTouchableContainer>
        <FollowingTouchableContainer>
          <SettingImg source={require('../../../assets/images/Setting.png')} />
        </FollowingTouchableContainer>
        <DescriptionContainer>
          <Description>{description}</Description>
        </DescriptionContainer>
      </SimpleProfile>
      <VerticalBar />
      <TouchableNaviContainer>
        <NaviLabel title="나의 레시피" num="12" />
        <NaviImg source={require('../../../assets/images/More_b.png')} />
      </TouchableNaviContainer>
      <VerticalBar />
      <TouchableNaviContainer>
        <NaviLabel title="식재료 관리" num="8" />
        <NaviImg source={require('../../../assets/images/More_b.png')} />
      </TouchableNaviContainer>
      <VerticalBar />
      <TouchableNaviContainer>
        <NaviLabel title="작성한 덧글" num="235" />
        <NaviImg source={require('../../../assets/images/More_b.png')} />
      </TouchableNaviContainer>
      <VerticalBar />
    </ProfileContainer>
  );
}

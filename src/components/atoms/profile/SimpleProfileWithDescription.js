import React from 'react';
import styled from 'styled-components/native';

export default function SimpleProfileWithDescription({
  username,
  nickname,
  description,
  profileURI,
}) {
  const ProfileContainer = styled.View`
    position: relative;

    width: 100%;
    height: 72px;
  `;

  const SimpleProfile = styled.View`
    width: 90%;
    height: 46px;

    margin: auto auto;
  `;

  const ProfileImg =
    profileURI !== undefined
      ? styled.Image`
          border-radius: 100px;
          border: 1px solid black;
          width: 46px;
          height: 46px;
        `
      : styled.View`
          border-radius: 100px;
          border: 1px solid black;
          width: 46px;
          height: 46px;
        `;

  const Nickname = styled.Text`
    position: absolute;
    height: 19px;
    left: 60px;
    top: 3px;

    color: #333333;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  `;

  const Description = styled.Text`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    color: #acacac;
    position: absolute;
    left: 60px;
    top: 25px;
  `;

  const Following = styled.Text`
    position: absolute;
    right: 0px;
    top: 33%;

    color: #f09311;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    text-align: right;
  `;

  //TODO : IMG URI 체킹할 방법 알아내야함.
  return (
    <ProfileContainer>
      <SimpleProfile>
        <ProfileImg source={{uri: profileURI}} />
        <Nickname>{nickname}</Nickname>
        <Description>{description}</Description>
        <Following>소식받기</Following>
      </SimpleProfile>
    </ProfileContainer>
  );
}

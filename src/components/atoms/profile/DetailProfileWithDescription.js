import React from 'react';
import styled from 'styled-components/native';
import {Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ActiveButton from '../board/ActiveButton';

export default function DetailProfileWithDescription({
  username,
  nickname,
  description,
  profileURI,
  isMine,
  navigation,
}) {
  const Container = styled.View`
    width: 100%;
    background: #f5f5f5;
  `;

  const InnerContainer = styled.View`
    width: 90%;
    margin: 15px auto 20px;
    display: flex;
  `;

  const TopPart = styled.View`
    width: 90%;
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  const ProfileImg =
    profileURI !== undefined
      ? styled.Image`
          border-radius: 100;
          border: 1px solid black;
          width: 64px;
          height: 64px;
        `
      : styled.View`
          border-radius: 100px;
          border: 1px solid black;
          width: 64px;
          height: 64px;
        `;

  const Nickname = styled.Text`
    margin-top: 10px;
    color: black;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    bottom: 3px;
  `;

  const SettingButtonLabel = styled.Text`
    color: #737373;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  `;

  const SettingButton = styled.TouchableOpacity`
    background: #ffffff;
    width: 100%;
    height: auto;
    padding: 15px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  `;

  const FollowingLabel = ({title, num}) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          minWidth: 64,
          height: 64,
          justifyContent: 'center',
          gap: 8,
        }}>
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 16,
            fontWeight: 500,
            color: 'black',
          }}>
          {num}
        </Text>
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 13,
            fontWeight: 400,
            color: 'black',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const FollowingLabelContainer = styled.View`
    display: flex;
    flex-direction: row;

    justify-content: space-evenly;

    width: 70%;
  `;

  const DescriptionPart = styled.View`
    gap: 3px;
    margin-bottom: 10px;
  `;

  const Description = styled.Text`
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #333333;
  `;

  const NicknamePart = styled.View`
    display: flex;
    flex-direction: row;

    justify-content: space-between;
  `;

  const DetailButton = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
  `;

  //TODO : IMG URI 체킹할 방법 알아내야함.
  //TODO : 내아이디가 아니면 프로필 수정과 세팅, 내가 작성한 댓글, 기타 안뜨게 하기
  return (
    <Container>
      <InnerContainer>
        <TopPart>
          <ProfileImg source={{uri: profileURI}} />
          <FollowingLabelContainer>
            <FollowingLabel title="팔로잉" num="12" />
            <FollowingLabel title="팔로워" num="12" />
            <FollowingLabel title="나의 레시피" num="12" />
          </FollowingLabelContainer>
        </TopPart>

        <DescriptionPart>
          <NicknamePart>
            <Nickname>{nickname}</Nickname>
            <DetailButton>
              <Image
                source={require('../../../assets/images/More_Horizon.png')}
                resizeMode={'cover'}
                style={{width: 15, height: 3}}
              />
            </DetailButton>
          </NicknamePart>
          <Description numberOfLines={3} ellipsizeMode={'tail'}>
            {description}
          </Description>
        </DescriptionPart>

        {isMine ? (
          <SettingButton>
            <SettingButtonLabel>나의 프로필 보기</SettingButtonLabel>
          </SettingButton>
        ) : (
          <ActiveButton
            width={'100%'}
            height={'41px'}
            isActive={true}
            border_radius={'8px'}
            LabelSize={'13px'}
            LabelInfo={'사용자아이디 000님 팔로잉하기'}
          />
        )}
      </InnerContainer>
    </Container>
  );
}

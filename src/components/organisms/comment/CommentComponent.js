import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {OptionModal} from '../../molecules/OptionModal';
import {err} from 'react-native-svg/lib/typescript/xml';
import {OptionModalChildImage} from '../OptionModalChildImage';

export const CommentComponent = ({
  username,
  nickname,
  created_date,
  existChild,
  description,
  details = false,
  isMine,
}) => {
  const navigation = useNavigation();
  const [isClicked, setClicked] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const optionRef = useRef();
  const items = [
    {
      label: '댓글 신고하기',
      value: 'report',
    },
    {
      label: '작성자 차단하기',
      value: 'userBlock',
    },
  ];

  const isMines = [
    {
      label: '댓글 수정하기',
      value: 'update',
    },
    {
      label: '댓글 삭제하기',
      value: 'delete',
    },
  ];

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.push('ProfileScreen')}>
        <UserImage />
      </TouchableOpacity>
      <CommentPart>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <NicknameAndCreatedDatePart>
            <Nickname>{nickname}</Nickname>
            <Nickname> · </Nickname>
            <Nickname>{created_date}</Nickname>
          </NicknameAndCreatedDatePart>
          <OptionModalChildImage items={isMine ? isMines : items}>
            <Image source={require('../../../assets/images/More.png')} />
          </OptionModalChildImage>
        </View>
        <Description numberOfLines={details ? 0 : 4} ellipsizeMode={'tail'}>
          {description}
        </Description>
        {existChild ? (
          <GoToReplyPart
            onPress={() =>
              navigation.push('ReplyComment', {
                username: username,
                nickname: nickname,
                created_date: created_date,
                description: description,
              })
            }>
            <ReplyLabel>답글 {'48'}개</ReplyLabel>
          </GoToReplyPart>
        ) : undefined}
      </CommentPart>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 8px;
`;

const UserImage = styled.View`
  width: 23px;
  height: 23px;
  border-radius: 23px;
  background: #a4a4a4;
`;

const Description = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #666666;
`;

const CommentPart = styled.View`
  width: 90%;
  gap: 5px;
`;

const NicknameAndCreatedDatePart = styled.View`
  flex-direction: row;
`;

const Nickname = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #666666;
`;

const GoToReplyPart = styled.TouchableOpacity`
  margin-top: 10px;
`;

const ReplyLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #f09311;
`;

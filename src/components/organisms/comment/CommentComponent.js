import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {OptionModalChildImage} from '../OptionModalChildImage';
import {CalanderPrint} from '../../../utils/CalanderPrint';
import AlertYesNoButton from '../../molecules/AlertYesNoButton';
import {removeComment} from '../../../services/Comment';
import {useToast} from 'react-native-toast-notifications';

export const CommentComponent = ({
  details = false,
  isMine,
  boardId,
  onRefresh,
  comment,
  existChild,
}) => {
  const navigation = useNavigation();
  const [checkedItem, setCheckedItem] = useState(undefined);
  const [isAlert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (checkedItem !== undefined) {
      checkedItem.onPress();
    }
  }, [checkedItem]);

  const items = !details
    ? [
        {
          label: '대댓글 작성하기',
          value: 'commentReply',
          onPress: () =>
            navigation.push('ReplyComment', {
              profile: comment.profile,
              created_date: comment.created_date,
              description: comment.description,
              parentCommentId: comment.commentId,
              boardId: boardId,
            }),
        },
        {
          label: '댓글 신고하기',
          value: 'report',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 신고하시겠습니까?');
          },
        },
        {
          label: '작성자 차단하기',
          value: 'userBlock',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 차단하시겠습니까?');
          },
        },
      ]
    : [
        {
          label: '댓글 신고하기',
          value: 'report',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 신고하사겠습니까?');
          },
        },
        {
          label: '작성자 차단하기',
          value: 'userBlock',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 차단하시겠습니까?');
          },
        },
      ];

  const isMines = !details
    ? [
        {
          label: '댓글 삭제하기',
          value: 'delete',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 삭제하시겠습니까?');
            setAlertText('삭제하면 복구가 불가능합니다.');
          },
        },
        {
          label: '대댓글 작성하기',
          value: 'commentReply',
          onPress: () =>
            navigation.push('ReplyComment', {
              profile: comment.userProfile,
              created_date: comment.createdDate,
              description: comment.description,
              parentCommentId: comment.commentId,
              boardId: boardId,
            }),
        },
      ]
    : [
        {
          label: '댓글 삭제하기',
          value: 'delete',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 삭제하시겠습니까?');
            setAlertText('삭제하면 복구가 불가능합니다.');
          },
        },
      ];

  return (
    <Container>
      <TouchableOpacity
        disabled={comment.userProfile.username === null}
        onPress={() =>
          navigation.push('ProfileScreen', {
            username: comment.userProfile.username,
          })
        }>
        <UserImage />
      </TouchableOpacity>
      <CommentPart>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <NicknameAndCreatedDatePart>
            <Nickname>{comment.userProfile.nickname}</Nickname>
            <Nickname> · </Nickname>
            <Nickname>{CalanderPrint(comment.createdDate)}</Nickname>
          </NicknameAndCreatedDatePart>
          {comment.userProfile.username === null ? undefined : (
            <OptionModalChildImage
              items={isMine ? isMines : items}
              setCheckedItem={setCheckedItem}>
              <Image source={require('../../../assets/images/More.png')} />
            </OptionModalChildImage>
          )}
        </View>
        <Description numberOfLines={details ? 0 : 4} ellipsizeMode={'tail'}>
          {comment.description}
        </Description>
        {existChild ? (
          <GoToReplyPart
            onPress={() =>
              navigation.push('ReplyComment', {
                comment: comment,
                parentCommentId: comment.commentId,
                boardId: boardId,
              })
            }>
            <ReplyLabel>대댓글 보기</ReplyLabel>
          </GoToReplyPart>
        ) : undefined}
      </CommentPart>
      {isAlert ? (
        <AlertYesNoButton
          title={alertTitle}
          setAlert={setAlert}
          yesButtonText={checkedItem.label}
          text={alertText}
          onPress={() => {
            if (checkedItem.value === 'delete') {
              removeComment(boardId, comment.commentId)
                .then(res => {
                  setAlert(() => false);
                  setTimeout(() => toast.show('댓글이 삭제되었습니다.'), 300);
                  onRefresh();
                })
                .catch(err => toast.show('댓글이 삭제되지 않았습니다.'));
            } else if (checkedItem.value === 'report') {
              console.log('신고 시퀀스');
            } else if (checkedItem.value === 'userBlock') {
              console.log('차단 시퀀스');
            }
          }}
        />
      ) : undefined}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 8px;
  margin: 10px 0;
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
  width: 90px;
`;

const ReplyLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #f09311;
`;

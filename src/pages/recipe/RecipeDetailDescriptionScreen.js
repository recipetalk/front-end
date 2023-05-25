import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import RecipeDetailDescription from '../../components/atoms/board/RecipeDetailDescription';
import {CommentWriteComponent} from '../../components/organisms/comment/CommentWriteComponent';
import {
  getChildComment,
  getParentComment,
  removeComment,
} from '../../services/Comment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {OptionModalChildImage} from '../../components/organisms/OptionModalChildImage';
import AlertYesNoButton from '../../components/molecules/AlertYesNoButton';
import {useToast} from 'react-native-toast-notifications';

const RecipeDetailDescriptionScreen = ({navigation, route}) => {
  const [Checked, setChecked] = useState(true);
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentPagingNum, setCommentPagingNum] = useState(0);
  const [isLast, setLast] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [checkedItem, setCheckedItem] = useState(null);
  const [isMine, setMine] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertText, setAlertText] = useState('');
  const [isEdit, setEdit] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getParentComment(route.params.boardId, 0).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(data.content);
      setCommentPagingNum(1);
      setLast(data.last);
    });
  }, [route.params.boardId]);

  useEffect(() => {
    if (checkedItem !== null) {
      checkedItem.onPress();
    }
  }, [checkedItem]);

  const onRefresh = async () => {
    setCommentRefresh(true);
    await getParentComment(route.params.boardId, 0).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(() => data.content);
      setCommentPagingNum(() => 1);
      setLast(() => data.last);
      setCommentRefresh(false);
    });
  };

  const onRequest = async () => {
    setLoading(() => true);
    await getParentComment(route.params.boardId, commentPagingNum).then(res => {
      const data = JSON.parse(res.request._response);
      setComment(comment => comment.concat(data.content));
      setCommentPagingNum(num => num + 1);
      setLast(() => data.last);
      setLoading(() => false);
    });
  };

  const items = isMine
    ? [
        {
          label: '삭제하기',
          value: 'delete',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 삭제하시겠습니까?');
            setAlertText('삭제하면 복구가 불가능합니다.');
          },
        },
        {
          label: '수정하기',
          value: 'commentReply',
          onPress: () => {
            setEdit(() => true);
          },
        },
      ]
    : [
        {
          label: '게시글 신고하기',
          value: 'report',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 신고하시겠습니까?');
            setAlertText('신중히 신고 해주시면 감사하겠습니다.');
          },
        },
        {
          label: '작성자 차단하기',
          value: 'block',
          onPress: () => {
            setAlert(true);
            setAlertTitle('정말 차단하시겠습니까?');
            setAlertText(
              '차단하게 되면 글 및 덧글, 프로필 모두 보이지 않게 됩니다.',
            );
          },
        },
      ];

  return (
    <>
      <RecipeDetailDescriptionContainer edges={['top']} />
      <Header>
        <TouchableOpacity
          style={{
            width: 15,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.pop()}>
          <Image
            source={require('../../assets/images/Back_w.png')}
            resizeMode="contain"
            style={{width: 15, height: 30}}
          />
        </TouchableOpacity>
        <OptionModalChildImage items={items} setCheckedItem={setCheckedItem}>
          <Image
            source={require('../../assets/images/More_w.png')}
            resizeMode="contain"
          />
        </OptionModalChildImage>
      </Header>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1, backgroundColor: 'white'}}>
        <RecipeDetailDescription
          setChecked={setChecked}
          boardId={route.params.boardId}
          commentRefresh={commentRefresh}
          comment={comment}
          setComment={setComment}
          onRefresh={onRefresh}
          onRequest={onRequest}
          isLast={isLast}
          isLoading={isLoading}
          setMine={setMine}
          isEdit={isEdit}
          navigation={navigation}
        />
        {Checked ? (
          <CommentWriteComponent
            boardId={route?.params?.boardId}
            setCommentRefresh={setCommentRefresh}
            onRefresh={onRefresh}
            isAbsolute={false}
          />
        ) : undefined}
      </KeyboardAvoidingView>
      {isAlert ? (
        <AlertYesNoButton
          title={alertTitle}
          setAlert={setAlert}
          yesButtonText={checkedItem.label}
          text={alertText}
          onPress={() => {
            if (checkedItem.value === 'delete') {
            } else if (checkedItem.value === 'report') {
            } else if (checkedItem.value === 'userBlock') {
            }
          }}
        />
      ) : undefined}
      {Checked ? (
        <SafeAreaView edges={['bottom']} style={{backgroundColor: 'white'}} />
      ) : undefined}
    </>
  );
};

const RecipeDetailDescriptionContainer = styled.SafeAreaView`
  width: 100%;
  background: #f09311;
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  background: #f09311;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 5%;
  padding-right: 5%;
`;

export default RecipeDetailDescriptionScreen;

import React, {memo, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {
  Alert,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {registerComment} from '../../../services/Comment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {loadProfileToStorage} from '../../../services/repository/Profile';

export const CommentWriteComponent = ({
  boardId,
  parentCommentId,
  isAbsolute = true,
  onRefresh,
}) => {
  const isFocused = useIsFocused();
  const [canSend, setCanSend] = useState(false);
  const [value, setValue] = useState('');
  const toast = useToast();
  const [loadProfile, setLoadProfile] = useState(null);

  useEffect(() => {
    init();
  }, [isFocused]);

  const init = async () => {
    const loadProfileInfo = await loadProfileToStorage();
    setLoadProfile(() => loadProfileInfo);
  };

  useEffect(() => {
    if (value.length > 0) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [value]);

  const textInputRef = useRef();

  const request = () => {
    registerComment(boardId, value, parentCommentId).then(res => {
      onRefresh();
      setValue('');
      textInputRef.current.blur();
      setTimeout(() => toast.show('덧글이 정상적으로 등록되었습니다.'), 300);
    });
  };

  return (
    <Container isAbsolute={isAbsolute}>
      <CommentPart>
        {loadProfile?.profileImageURI != null &&
        loadProfile?.profileImageURI != '' ? (
          <UserImage source={{uri: loadProfile?.profileImageURI}} />
        ) : (
          <UserImageDummy />
        )}
        <InputBox
          ref={textInputRef}
          multiline
          value={value}
          onChangeText={text => setValue(text)}
          onSubmitEditing={() => {}} // 엔터 눌렀을 때 동작하는 것
          placeholder={'댓글 달기'}
          placeholderTextColor={'#666666'}
        />
      </CommentPart>

      <TouchableOpacity disabled={!canSend} onPress={() => request()}>
        {canSend ? (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/images/Comment_Send_Active.png')}
          />
        ) : (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/images/Comment_Send.png')}
          />
        )}
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  min-height: 50px;
  max-height: 100px;
  ${props =>
    props.isAbsolute ? '  position: absolute;' : '  position: relative;'}
  bottom: 0px;
  background: #ffffff;
  border-top-color: #e1e1e1;
  border-top-width: 1px;
  border-top-style: solid;
  padding-left: 5%;
  padding-right: 13%;
  padding-top: 5px;
  ${() =>
    Platform.OS === 'ios' ? 'padding-bottom: 5px;' : 'padding-bottom: 5px;'}
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 15px;
`;

const CommentPart = styled.View`
  width: 100%;
  background: #e4e4e4;
  border-radius: 8px;
  padding-top: 4px;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 5px;
  justify-content: center;
  flex-direction: row;
`;

const InputBox = styled.TextInput`
  width: 100%;
  padding: 0;
  margin-left: 5px;
  color: #333333;
`;
const UserImage = styled.Image`
  width: 23px;
  height: 23px;
  border-radius: 23px;
  background: #a4a4a4;
  margin-top: 0px;
`;
const UserImageDummy = styled.View`
  width: 23px;
  height: 23px;
  border-radius: 23px;
  background: #a4a4a4;
  margin-top: 0px;
`;


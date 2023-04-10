import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Image, Platform, TouchableOpacity} from 'react-native';

export const CommentWriteComponent = ({
  value,
  setValue,
  enterAction,
  isAbsolute = true,
}) => {
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    if (value.length > 0) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [value]);

  return (
    <Container isAbsolute={isAbsolute}>
      <CommentPart>
        <UserImage />
        <InputBox
          multiline
          value={value}
          onChangeText={text => setValue(text)}
          onSubmitEditing={() => {}} // 엔터 눌렀을 때 동작하는 것
          placeholder={'댓글 달기'}
          placeholderTextColor={'#666666'}
        />
      </CommentPart>
      <TouchableOpacity disabled={canSend}>
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
  ${props => (props.isAbsolute ? '  position: absolute;' : undefined)}
  bottom: 0px;
  background: #ffffff;
  ${props => (props.isAbsolute ? '  border: 1px solid #e1e1e1;' : undefined)}
  padding-left: 5%;
  padding-right: 13%;
  padding-top: 5px;
  ${() =>
    Platform.OS === 'ios' ? 'padding-bottom: 35px;' : 'padding-bottom: 5px;'}
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
const UserImage = styled.View`
  width: 23px;
  height: 23px;
  border-radius: 23px;
  background: #a4a4a4;
  margin-top: 0px;
`;

const InputBox = styled.TextInput`
  width: 100%;
  padding: 0;
  margin-left: 5px;
  color: #333333;
`;

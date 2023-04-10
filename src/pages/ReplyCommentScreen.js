import styled from 'styled-components/native';
import React, {useState} from 'react';
import {NavigationHeader} from '../components/organisms/mypage/NavigationHeader';
import {CommentComponent} from '../components/organisms/comment/CommentComponent';
import {CommentListComponent} from '../components/templates/board/CommentListComponent';
import {CommentWriteComponent} from '../components/organisms/comment/CommentWriteComponent';
import {View} from 'react-native';

export const ReplyCommentScreen = ({navigation, route}) => {
  const [writeComment, setWriteComment] = useState('');
  return (
    <Container>
      <NavigationHeader title={'전체댓글'} navigation={navigation} />
      <ParentComment>
        <CommentComponent
          created_date={route.params.created_date}
          existChild={false}
          description={route.params.description}
          nickname={route.params.nickname}
          username={route.params.username}
          details={true}
        />
      </ParentComment>
      <View style={{paddingLeft: '2%', backgroundColor: 'white'}}>
        <CommentWriteComponent
          value={writeComment}
          setValue={setWriteComment}
          isAbsolute={false}
        />
      </View>
      <ChildPart>
        <CommentListComponent isReply={true} />
      </ChildPart>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const ParentComment = styled.View`
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
  padding-bottom: 15px;
`;

const ChildPart = styled.View`
  width: 100%;
  height: 100%;
  padding-left: 3%;
  background: #ffffff;
`;

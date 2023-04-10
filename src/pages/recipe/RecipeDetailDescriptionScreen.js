import React, {useRef, useState} from 'react';
import {Image, Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import RecipeDetailDescription from '../../components/atoms/board/RecipeDetailDescription';
import {CommentWriteComponent} from '../../components/organisms/comment/CommentWriteComponent';

const RecipeDetailDescriptionScreen = ({navigation}) => {
  const CommentListRef = useRef();
  const [Checked, setChecked] = useState(true);
  const [parentComment, setParentComment] = useState('');
  return (
    <RecipeDetailDescriptionContainer>
      <Header>
        <TouchableOpacity
          style={{padding: 9, width: 15, height: 15}}
          onPress={() => navigation.pop()}>
          <Image
            source={require('../../assets/images/Back_w.png')}
            resizeMode="contain"
            style={{width: 15, height: 30}}
          />
        </TouchableOpacity>
      </Header>
      <RecipeDetailDescription
        CommentListRef={CommentListRef}
        setChecked={setChecked}
        parentComment={parentComment}
        setParentComment={setParentComment}
      />
      {Checked ? (
        <CommentWriteComponent
          value={parentComment}
          setValue={setParentComment}
        />
      ) : undefined}
    </RecipeDetailDescriptionContainer>
  );
};

const RecipeDetailDescriptionContainer =
  Platform.OS === 'ios'
    ? styled.SafeAreaView`
        height: 100%;
        margin-bottom: 125px;
      `
    : styled.View`
        height: 100%;
        margin-bottom: 125px;
      `;

const Header = styled.View`
  width: 100%;
  height: 50px;
  background: #f09311;
`;

export default RecipeDetailDescriptionScreen;

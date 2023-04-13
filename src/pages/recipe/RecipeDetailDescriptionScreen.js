import React, {useRef, useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import RecipeDetailDescription from '../../components/atoms/board/RecipeDetailDescription';
import {CommentWriteComponent} from '../../components/organisms/comment/CommentWriteComponent';

const RecipeDetailDescriptionScreen = ({navigation, route}) => {
  const CommentListRef = useRef();
  const [Checked, setChecked] = useState(true);
  const [parentComment, setParentComment] = useState('');
  return (
    <RecipeDetailDescriptionContainer>
      <View style={{backgroundColor: '#f5f5f5', marginBottom: 50}}>
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
      </View>
      {Checked ? (
        <CommentWriteComponent
          value={parentComment}
          setValue={setParentComment}
        />
      ) : undefined}
    </RecipeDetailDescriptionContainer>
  );
};

const RecipeDetailDescriptionContainer = styled.SafeAreaView`
  height: 100%;
  background: #f09311;
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  background: #f09311;
`;

export default RecipeDetailDescriptionScreen;

import React, {useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../components/atoms/board/RadioButton';
import DropDownPickerComponent from '../../components/molecules/DropDownPickerComponent';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import DList from '../../components/organisms/Home/DList';
import {TouchableOpacity} from 'react-native';

export const MyLikeScreen = ({navigation}) => {
  const dummy = [1, 2, 3, 4, 5];

  return (
    <Container>
      <NavigationHeader navigation={navigation} title={'나의 좋아요'} />
      <HorizontalBar />
      <InnerContainer>
        {dummy.map((v, i) => {
          return <CustomDList key={v} value={i} />;
        })}
      </InnerContainer>
    </Container>
  );
};

const CustomDList = ({key, value}) => {
  return (
    <CustomDListContainer>
      <DList key={key} value={value} />
      <TouchableOpacity>
        <LikeImage source={require('../../assets/images/LikeTrue.png')} />
      </TouchableOpacity>
    </CustomDListContainer>
  );
};

const CustomDListContainer = styled.View`
  width: 100%;
  position: relative;
`;

const LikeImage = styled.Image`
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 10px;
  right: 5%;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

const InnerContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;

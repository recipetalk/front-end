import React from 'react';
import styled from 'styled-components/native';
import BottomImageComponent from '../BottomImageComponent';

const EList = props => {
  return (
    <EListContainer>
      <CustomView />
      <Title>[찌개요리] 자취 8년차 된장찌개</Title>
      <Content>맛있는 된장찌개의 비법은 쌈장입..</Content>
      <Line />

      <BottomImageComponent isBookmark={false} />
    </EListContainer>
  );
};

const EListContainer = styled.SafeAreaView`
  margin-right: 20px;
`;

const CustomView = styled.View`
  width: 200px;
  height: 100px;

  border-radius: 8px;
  border: 1px solid black;

  margin-bottom: 8px;
`;

const Title = styled.Text`
  margin-bottom: 8px;
`;

const Content = styled.Text`
  margin-bottom: 15px;
`;

const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: gray;
  margin-bottom: 8px;
`;

export default EList;

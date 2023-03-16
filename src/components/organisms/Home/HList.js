import React from 'react';
import styled from 'styled-components/native';
import BottomImageComponent from '../BottomImageComponent';

const HList = props => {
  return (
    <HListContainer>
      <Thumbnail />
      <Title>자취 8년차 된장찌개 맛있....</Title>
      <BottomImageComponent isBookmark={false} />
    </HListContainer>
  );
};
const HListContainer = styled.View`
  margin-bottom: 16px;
`;

const Thumbnail = styled.View`
  width: 166px;
  height: 166px;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 8px;
  margin-right: 12px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';

  color: #666666;
  margin-bottom: 8px;
`;

export default HList;

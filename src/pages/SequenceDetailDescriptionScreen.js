import React from 'react';
import styled from 'styled-components/native';
import SequenceDetailDescription from '../components/atoms/board/SequenceDetailDescription';

const SequenceDetailDescriptionScreen = () => {
  return (
    <SequenceDetailDescriptionContainer>
      <Header />
      <SequenceDetailDescription index={1} lastIndex={3} />
    </SequenceDetailDescriptionContainer>
  );
};

const Header = styled.View`
  width: 100%;
  height: 50px;
`;

const SequenceDetailDescriptionContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: #202020;
`;

export default SequenceDetailDescriptionScreen;

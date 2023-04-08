import React from 'react';
import styled from 'styled-components/native';
import {Modal} from 'react-native';

export default function AlertBackground(props) {
  return (
    <Modal transparent={true}>
      <BackgroundContainer>{props.children}</BackgroundContainer>
    </Modal>
  );
}

const BackgroundContainer = styled.View`
  width: 100%;
  height: 120%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  align-items: center;
`;

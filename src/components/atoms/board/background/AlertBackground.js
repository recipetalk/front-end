import React from 'react';
import styled from 'styled-components/native';

export default function AlertBackground(props) {
  return <BackgroundContainer>{props.children}</BackgroundContainer>;
}

const BackgroundContainer = styled.View`
  width: 100%;
  height: 120%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;

  align-items: center;
`;

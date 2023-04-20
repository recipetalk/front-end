import React from 'react';
import styled from 'styled-components/native';
import AlertBackground from './board/background/AlertBackground';
import {Dimensions, TouchableWithoutFeedback} from 'react-native';

export default function Alert(props) {
  return (
    <AlertBackground setAlert={props.setAlert}>
      <TouchableWithoutFeedback>
        <Box>{props.children}</Box>
      </TouchableWithoutFeedback>
    </AlertBackground>
  );
}

const Box = styled.View`
  width: 70%;
  height: auto;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  background-color: #ffffff;
  position: absolute;
  top: ${Dimensions.get('window').height / 3.5}px;
`;

import React from 'react';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';

const BarView = styled.View`
  width: 100%;
`;

const ProgressBar = ({totalStep, nowStep}) => {
  return (
    <BarView>
      <Progress.Bar
        progress={nowStep / totalStep}
        width={null}
        height={3}
        color={'#f09311'}
        borderWidth={0}
        borderRadius={0}
      />
    </BarView>
  );
};

export default ProgressBar;

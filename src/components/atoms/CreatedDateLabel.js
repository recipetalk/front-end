import styled from 'styled-components/native';
import React from 'react';

export default function CreatedDateLabel({createdDate}) {
  const Label = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    text-align: center;
    line-height: 15px;

    /* A0A0A0 */

    color: #a0a0a0;
  `;

  return <Label>몇 시간 전이야</Label>;
}

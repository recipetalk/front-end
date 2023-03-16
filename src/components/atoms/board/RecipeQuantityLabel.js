import styled from 'styled-components/native';
import React from 'react';

export default function RecipeQuantityLabel({quantity}) {
  const QuantityLabel = styled.Text`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    font-family: 'Pretendard Variable';
    color: #a0a0a0;
  `;

  return <QuantityLabel>{quantity + '인분'}</QuantityLabel>;
}

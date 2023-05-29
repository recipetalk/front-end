import styled from 'styled-components/native';
import React, {memo} from 'react';
import {RecipeQuantityList} from '../../../category/recipe/RecipeQuantityList';

function RecipeQuantityLabel({quantity}) {
  const getQuantity = quantity => {
    return RecipeQuantityList[
      RecipeQuantityList.findIndex(value => value.key === quantity)
    ].label;
  };

  return <QuantityLabel>{getQuantity(quantity)}</QuantityLabel>;
}

const QuantityLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
`;

export default memo(RecipeQuantityLabel);

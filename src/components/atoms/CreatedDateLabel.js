import styled from 'styled-components/native';
import React, {memo, useEffect, useState} from 'react';


function CreatedDateLabel({createdDate}) {
  const [date, setDate] = useState(new Date(createdDate));


  useEffect(() => {
    console.log(date);
  }, []);

  return <Label>몇 시간 전이야</Label>;
}

const Label = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
`;

export default memo(CreatedDateLabel);

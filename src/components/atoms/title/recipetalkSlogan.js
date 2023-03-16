import React from 'react';
import styled from 'styled-components/native';

export default function SloganText() {
  const SloganContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    width: 73%;
    margin-left: 16px;
  `;

  const FirstSlogan = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 41px;
    font-family: 'Pretendard Variable';
    color: black;
  `;

  const SecondSlogan = styled.Text`
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 41px;
    margin-top: -10px;
    font-family: 'Pretendard Variable';
    color: black;
  `;

  const ThirdSlogan = styled.Text`
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    font-family: 'Pretendard Variable';
    margin-top: 15px;
    color: #666666;
  `;
  return (
    <SloganContainer>
      <FirstSlogan>일상 요리의 시작.</FirstSlogan>
      <SecondSlogan>레시피톡으로 함께해요.</SecondSlogan>
      <ThirdSlogan>매일의 요리가 새로워지는 레시피톡</ThirdSlogan>
    </SloganContainer>
  );
}

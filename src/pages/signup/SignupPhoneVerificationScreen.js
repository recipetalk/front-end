import React from 'react';
import styled from 'styled-components/native';

export default function SignupIdScreen({navigator}) {
  const Description = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 41px;

    color: black;
  `;

  const SignupIdScreenContainer = styled.View``;

  return (
    <SignupIdScreenContainer>
      <Description>로그인 시 사용할 아이디를 입력해주세요.</Description>
    </SignupIdScreenContainer>
  );
}

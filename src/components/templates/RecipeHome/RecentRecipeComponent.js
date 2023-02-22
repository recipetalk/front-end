import SimpleProfileWithDescription from '../../atoms/profile/SimpleProfileWithDescription';
import RecipeSimpleDescription from '../../atoms/board/RecipeSimpleDescription';
import styled from 'styled-components/native';
import React from 'react';

export default function RecentRecipeComponent() {
  const RecentRecipeComponent = styled.View``;

  return (
    <RecentRecipeComponent>
      <SimpleProfileWithDescription
        nickname={'사용자아이디0000'}
        description={'4아이 엄마~^^'}
      />
      <RecipeSimpleDescription
        title={'[찌개요리]자취 8년차 된장찌개 맛있게 끓이는 법'}
        hashtags={['#한식', '#한식', '#한식']}
        description={
          '안녕하세요 자취 8년차의 특별한 부대찌개 레시피를. 공개합니다. 여러분 요리는 과학이에요. 레시피를 불과 8년차...'
        }
        quantity={'4'}
      />
    </RecentRecipeComponent>
  );
}

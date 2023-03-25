import React from 'react';
import styled from 'styled-components/native';
import PrepDetailComponent from '../../components/templates/Ingredients/PrepDetailComponent';

const PrepDetailScreen = () => {
  return (
    <PrepDetailScreenContainer>
      <PrepDetailComponent />
    </PrepDetailScreenContainer>
  );
};

const PrepDetailScreenContainer = styled.SafeAreaView`
  background-color: #ffffff;
`;

export default PrepDetailScreen;

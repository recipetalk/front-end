import React from 'react';
import styled from 'styled-components/native';
import DList from '../../components/organisms/Home/DList';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../components/organisms/Ingredients/IngredientsInfo';

const PrepScreen = () => {
  return (
    <PrepScreenContainer>
      <IngredientsHeader title="손질법" />
      <IngredientsInfo />

      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <Line />
        <Header>
          <TitleHighlight>마늘</TitleHighlight>
          <Title> 손질법</Title>
        </Header>
        {[1, 2, 3, 4, 5].map((v, i) => {
          return (
            <Test key={i}>
              <DList />
            </Test>
          );
        })}
      </ScrollViewContainer>
    </PrepScreenContainer>
  );
};

const PrepScreenContainer = styled.SafeAreaView``;

const Line = styled.View`
  width: 100%;
  height: 6px;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 18px 0 0 18px;
  background-color: #ffffff;
`;
const TitleHighlight = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  color: #f09311;
`;
const Title = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  color: #333333;
`;

const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 160px;
`;

const Test = styled.TouchableOpacity``;
export default PrepScreen;

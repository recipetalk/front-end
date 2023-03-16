import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import Line from '../../components/atoms/Line';
import DList from '../../components/organisms/Home/DList';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../components/organisms/Ingredients/IngredientsInfo';

const PrepScreen = () => {
  const navigation = useNavigation();

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
            <Test key={i} onPress={() => navigation.navigate('PrepDetail')}>
              <DList />
            </Test>
          );
        })}
      </ScrollViewContainer>
    </PrepScreenContainer>
  );
};

const PrepScreenContainer = styled.SafeAreaView``;

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
  font-family: 'Pretendard Variable';
  color: #f09311;
`;
const Title = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 160px;
`;

const Test = styled.TouchableOpacity``;
export default PrepScreen;

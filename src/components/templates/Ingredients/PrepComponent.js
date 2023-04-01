import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import Line from '../../atoms/Line';
import DList from '../../organisms/Home/DList';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';

const PrepComponent = () => {
  const navigation = useNavigation();

  return (
    <PrepComponentContainer>
      <IngredientsHeader title="손질법" />
      <IngredientsInfo />

      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <Line />
        <Header>
          <TitleHighlightText>마늘</TitleHighlightText>
          <TitleText> 손질법</TitleText>
        </Header>
        {/* {[1, 2, 3, 4, 5].map((v, i) => {
          return (
            <TouchContainer
              key={i}
              onPress={() => navigation.navigate('PrepDetail')}>
              <DList />
            </TouchContainer>
          );
        })} */}
      </ScrollViewContainer>
    </PrepComponentContainer>
  );
};

const PrepComponentContainer = styled.SafeAreaView``;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 18px 0 18px 18px;
  background-color: #ffffff;
`;

const TitleHighlightText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const TitleText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 160px;
`;

const TouchContainer = styled.TouchableOpacity``;
export default PrepComponent;

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import Line from '../../components/atoms/Line';
import DList from '../../components/organisms/Home/DList';
import IngredientsHeader from '../../components/organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../components/organisms/Ingredients/IngredientsInfo';

const PrepScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <PrepScreenContainer>
        <IngredientsHeader title="손질법" />
        <IngredientsInfo />

        <ScrollViewContainer showsVerticalScrollIndicator={false}>
          <Line />
          <Header>
            <TitleHighlightText>마늘</TitleHighlightText>
            <TitleText>손질법</TitleText>
          </Header>
          {[1, 2, 3, 4, 5].map((v, i) => {
            return (
              <TouchContainer
                key={i}
                onPress={() => navigation.navigate('PrepDetail')}>
                <DList />
              </TouchContainer>
            );
          })}
        </ScrollViewContainer>
      </PrepScreenContainer>
      <PrepRegisterButton onPress={() => navigation.push('PrepRegister')}>
        <Image source={require('../../assets/images/ggggector.png')} />
      </PrepRegisterButton>
    </>
  );
};

const PrepScreenContainer = styled.SafeAreaView``;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 18px 0 0 18px;
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
const PrepRegisterButton = styled.TouchableOpacity`
  position: absolute;
  width: 55px;
  height: 55px;
  background: #333333;
  border-radius: 100px;
  right: 20px;
  bottom: 20px;

  align-items: center;
  justify-content: center;
`;

export default PrepScreen;

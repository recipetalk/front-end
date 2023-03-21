import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';

const IngredientsItem = () => {
  const navigation = useNavigation();

  return (
    <IngredientsItemContainer>
      <Header>
        <IngredientsItemInfo>
          <Name>마늘</Name>
          <Amount>생것 | 200g</Amount>
        </IngredientsItemInfo>
        <TouchContainer>
          <Image source={require('../../../assets/images/More.png')} />
        </TouchContainer>
      </Header>

      <IngredientsItemETCInfo>
        <TouchContainer onPress={() => navigation.navigate('Efficacy')}>
          <EfficacyText>효능 및 정보</EfficacyText>
        </TouchContainer>
        <Text> | </Text>
        <TouchContainer onPress={() => navigation.navigate('Prep')}>
          <PrepText>손질법 보기</PrepText>
        </TouchContainer>
      </IngredientsItemETCInfo>

      <ExpirationInfo>
        <ExpirationInfoText>유통기한 : 2023 / 02 / 28 까지</ExpirationInfoText>
      </ExpirationInfo>
    </IngredientsItemContainer>
  );
};

const IngredientsItemContainer = styled.View`
  margin: 0 15px 15px 15px;
  background-color: #ffffff;
  border-radius: 3px;
  height: 130px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const TouchContainer = styled.TouchableOpacity``;

const IngredientsItemInfo = styled.View`
  display: flex;
  flex-direction: row;
`;

const Name = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #333333;

  margin-right: 10px;
`;

const Amount = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  color: #666666;
`;

const IngredientsItemETCInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
`;

const EfficacyText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;

  font-family: 'Pretendard Variable';
  text-align: center;

  color: #666666;
`;

const PrepText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #666666;
`;
const ExpirationInfo = styled.View`
  width: 340px;
  height: 30px;
  padding: 5px 10px;
  gap: 10px;

  background-color: #fff4e6;
  border-radius: 70px;
  margin: auto;
`;

const ExpirationInfoText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  font-family: 'Pretendard Variable';

  color: #f09311;
  text-align: center;
`;
export default IngredientsItem;

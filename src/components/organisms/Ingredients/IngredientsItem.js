import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';

const IngredientsItem = () => {
  const navigation = useNavigation();

  return (
    <IngredientsItemContainer>
      <Header>
        <RegisterInfo>
          <Name>마늘</Name>
          <Amount>생것 | 200g</Amount>
        </RegisterInfo>
        <MoreButton>
          <Image source={require('../../../assets/images/More.png')} />
        </MoreButton>
      </Header>
      <IngredientsInfo>
        <EfficacyBtn onPress={() => navigation.navigate('Efficacy')}>
          <EfficacyText>효능 및 정보</EfficacyText>
        </EfficacyBtn>
        <Text> | </Text>
        <PrepBtn onPress={() => navigation.navigate('Prep')}>
          <PrepText>손질법 보기</PrepText>
        </PrepBtn>
      </IngredientsInfo>
      <Expiration>
        <ExpirationText>유통기한 : 2023 / 02 / 28 까지</ExpirationText>
      </Expiration>
    </IngredientsItemContainer>
  );
};

const IngredientsItemContainer = styled.View`
  margin: 15px 15px 0 15px;
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

const MoreButton = styled.TouchableOpacity``;

const RegisterInfo = styled.View`
  display: flex;
  flex-direction: row;
`;

const Name = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;

  text-align: center;

  color: #333333;

  margin-right: 10px;
`;

const Amount = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  color: #666666;
`;

const IngredientsInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
`;

const EfficacyBtn = styled.TouchableOpacity``;
const EfficacyText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;

  text-align: center;

  color: #666666;
`;
const PrepBtn = styled.TouchableOpacity``;
const PrepText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;

  text-align: center;

  color: #666666;
`;
const Expiration = styled.View`
  width: 340px;
  height: 30px;
  padding: 5px 10px;
  gap: 10px;

  background-color: #fff4e6;
  border-radius: 70px;
  margin: auto;
`;

const ExpirationText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  color: #f09311;
  text-align: center;
`;
export default IngredientsItem;

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';
import {OptionModalChildImage} from '../OptionModalChildImage';

const IngredientsItem = props => {
  const navigation = useNavigation();

  const items = [
    {
      label: '수정',
      value: 'update',
    },
    {
      label: '재료 삭제',
      value: 'delete',
    },
  ];

  return props.item !== undefined ? (
    <IngredientsItemContainer>
      <Header>
        <IngredientsItemInfo>
          <Name>{props.item.name}</Name>
          <Amount>
            {props.item.status} | {props.item.amount}
          </Amount>
        </IngredientsItemInfo>
        <TouchContainer>
          <OptionModalChildImage items={items}>
            <Image source={require('../../../assets/images/More.png')} />
          </OptionModalChildImage>
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
        <ExpirationInfoText>
          소비기한 : {props.item.expirationDate}까지
        </ExpirationInfoText>
      </ExpirationInfo>
    </IngredientsItemContainer>
  ) : (
    <IngredientsItemContainer>
      <Header>
        <IngredientsItemInfo>
          <Name>마늘</Name>
          <Amount>생것 | 100개</Amount>
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
        <ExpirationInfoText>소비기한 : 2023 / 10 / 10까지</ExpirationInfoText>
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

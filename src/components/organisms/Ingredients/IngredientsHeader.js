import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

const IngredientsHeader = props => {
  const navigation = useNavigation();

  return (
    <Header>
      <TitleContainer>
        <BackBtn onPress={() => navigation.goBack()}>
          <Back source={require('../../../assets/images/Back.png')} />
        </BackBtn>
        <HeaderTitle>{props.title}</HeaderTitle>
      </TitleContainer>
      {props.isTitleOnly ? null : (
        <BtnBtn>
          <BtnValueText>{props.btnTextValue}</BtnValueText>
        </BtnBtn>
      )}
    </Header>
  );
};

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
  background-color: #ffffff;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const BackBtn = styled.TouchableOpacity``;
const Back = styled.Image`
  margin-right: 20px;
`;

const HeaderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
`;

const BtnValueText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #f09311;
`;
const BtnBtn = styled.TouchableOpacity``;
export default IngredientsHeader;

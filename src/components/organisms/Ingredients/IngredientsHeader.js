import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

const IngredientsHeader = props => {
  const navigation = useNavigation();

  return (
    <Header isTransparent={props.isTransparent}>
      <TitleContainer>
        <BackBtn onPress={() => navigation.goBack()}>
          {props.isTransparent ? (
            <Back source={require('../../../assets/images/Back_w.png')} />
          ) : (
            <Back source={require('../../../assets/images/Back.png')} />
          )}
        </BackBtn>
        <HeaderTitle isTransparent={props.isTransparent}>
          {props.title}
        </HeaderTitle>
      </TitleContainer>
      {props.isTitleOnly ? null : (
        <BtnBtn onPress={() => navigation.navigate(props.screen)}>
          <BtnValueText isTransparent={props.isTransparent}>
            {props.btnTextValue}
          </BtnValueText>
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
  background-color: ${props => (props.isTransparent ? 'black' : '#ffffff')};
  opacity: ${props => (props.isTransparent ? '0.8' : '1.0')};
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const BackBtn = styled.TouchableOpacity``;
const Back = styled.Image`
  margin-right: 20px;
  width: 18px;
  height: 18px;
`;

const HeaderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: ${props => (props.isTransparent ? '#ffffff' : '#333333')};
  font-family: 'Pretendard Variable';
`;

const BtnValueText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: ${props => (props.isTransparent ? '#ffffff' : '#f09311')};
  font-family: 'Pretendard Variable';
`;

const BtnBtn = styled.TouchableOpacity``;
export default IngredientsHeader;

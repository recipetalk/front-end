import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';

const IngredientsHeader = props => {
  const navigation = useNavigation();

  return (
    <Header isTransparent={props.isTransparent}>
      <TitleContainer>
        <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
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
        </View>
        {props.isTitleOnly ? null : (
          <BtnBtn onPress={() => navigation.navigate(props.screen)}>
            <BtnValueText isTransparent={props.isTransparent}>
              {props.btnTextValue}
            </BtnValueText>
          </BtnBtn>
        )}
      </TitleContainer>
    </Header>
  );
};

const Header = styled.View`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
  background-color: ${props => (props.isTransparent ? 'black' : '#ffffff')};
  opacity: ${props => (props.isTransparent ? '0.8' : '1.0')};
`;

const TitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

const BackBtn = styled.TouchableOpacity``;

const Back = styled.Image``;

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

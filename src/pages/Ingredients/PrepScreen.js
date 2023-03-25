import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import PrepComponent from '../../components/templates/Ingredients/PrepComponent';

const PrepScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <PrepComponent />
      <PrepRegisterButton onPress={() => navigation.push('PrepRegister')}>
        <Image source={require('../../assets/images/ggggector.png')} />
      </PrepRegisterButton>
    </>
  );
};

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

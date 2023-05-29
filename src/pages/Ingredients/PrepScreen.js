import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import PrepComponent from '../../components/templates/Ingredients/PrepComponent';
import {resetPrep} from '../../store/Ingredients/PrepSlice';

const PrepScreen = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPrep());
  }, [dispatch, isFocused]);

  return (
    <>
      <PrepComponent />
      <PrepRegisterButton
        onPress={() =>
          navigation.push('PrepRegister', {
            ingredientID: router.params.ingredientID,
          })
        }>
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

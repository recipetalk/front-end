import React, {memo} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import situationCategory, {
  setSituationCategory,
} from '../../../store/RecipeHome/SituationCategory';
import sortCategory, {
  setSortCategory,
} from '../../../store/RecipeHome/SortCategory';
import {useNavigation} from '@react-navigation/native';
import {setGoToRecipeHome} from '../../../store/RecipeHome/IsGoToRecipeHome';

const CItem = ({firstClicked, sort, situation, labelText, imgURL}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const touchAction = () => {
    dispatch(setFirstClicked(firstClicked));
    dispatch(setSituationCategory(situation));
    dispatch(setSortCategory(sort));
    dispatch(setGoToRecipeHome(true));
    navigation.navigate('Recipe');
  };
  const url = '';
  return (
    <Container onPress={() => touchAction()}>
      <Image source={imgURL} />
      <Label>{labelText}</Label>
    </Container>
  );
};

const Image = styled.Image`
  width: 46px;
  height: 46px;
`;

const Container = styled.TouchableOpacity`
  height: 68px;
  align-items: center;
  width: 20%;
  margin-bottom: 15px;
  gap: 5px;
`;

const Label = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  color: #737373;
`;

export default memo(CItem);

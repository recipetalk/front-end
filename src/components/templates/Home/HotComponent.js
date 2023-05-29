import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import EList from '../../organisms/Home/EList';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import {setSituationCategory} from '../../../store/RecipeHome/SituationCategory';
import {setSortCategory} from '../../../store/RecipeHome/SortCategory';
import {setGoToRecipeHome} from '../../../store/RecipeHome/IsGoToRecipeHome';

const HotComponent = props => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (props?.isRefresh) {
      init();
    }
  }, [props.isRefresh]);

  const init = async () => {
    await getDynamicRecipes(null, 'POPULAR', null, null, 0, 3, null)
      .then(res => {
        const data = JSON.parse(res.request._response);
        console.log(data);
        setData(data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const touchAction = () => {
    dispatch(setFirstClicked({key: 2}));
    dispatch(setSituationCategory(null));
    dispatch(setSortCategory(null));
    dispatch(setGoToRecipeHome(true));
    navigation.navigate('Recipe');
  };

  return (
    <EComponentContainer>
      <Header>
        <CustomText>인기 레시피 TOP</CustomText>
        <ViewMoreBtn onPress={() => touchAction()}>
          <Image source={require('../../../assets/images/More_Arrow.png')} />
        </ViewMoreBtn>
      </Header>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({item}) => {
          return <EList value={item} boardSort={'RECIPE'} />;
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={_ => _?.board?.boardId}
      />
    </EComponentContainer>
  );
};

const EComponentContainer = styled.View`
  margin-top: 10px;
  padding-top: 17px;
  background: white;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 10px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 13px;
  align-items: center;
`;

const CustomText = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  font-family: 'Pretendard Variable';
  color: #383838;
`;

const ViewMoreBtn = styled.TouchableOpacity``;

export default HotComponent;

import React, {useEffect, useState} from 'react';
import {FlatList, Image} from 'react-native';
import styled from 'styled-components/native';
import DList from '../../organisms/Home/DList';
import {loadLoginFromStorage} from '../../../services/repository/AutoLogin';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import {determinePageEnd} from '../../../utils/determinePageEnd';
import HList from '../../organisms/Home/HList';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import {setSituationCategory} from '../../../store/RecipeHome/SituationCategory';
import {setSortCategory} from '../../../store/RecipeHome/SortCategory';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setGoToRecipeHome} from '../../../store/RecipeHome/IsGoToRecipeHome';

const RecentComponent = props => {
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
    await getDynamicRecipes(null, 'NEW', null, null, 0, 3, null)
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
    dispatch(setFirstClicked({key: 1}));
    dispatch(setSituationCategory(null));
    dispatch(setSortCategory(null));
    dispatch(setGoToRecipeHome(true));
    navigation.navigate('Recipe');
  };

  return (
    <DComponentContainer>
      <Header>
        <CustomText>최신 레시피</CustomText>
        <ViewMoreBtn onPress={() => touchAction()}>
          <Image source={require('../../../assets/images/More_Arrow.png')} />
        </ViewMoreBtn>
      </Header>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{height: 'auto'}}
        data={data}
        renderItem={({item}) => {
          return <DList value={item} boardSort={'RECIPE'} />;
        }}
        keyExtractor={_ => _?.board?.boardId}
      />
    </DComponentContainer>
  );
};

const DComponentContainer = styled.View`
  background: white;
  margin-top: 17px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 15px;
`;

const CustomText = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  font-family: 'Pretendard Variable';
  color: #383838;
`;

const ViewMoreBtn = styled.TouchableOpacity``;
export default RecentComponent;

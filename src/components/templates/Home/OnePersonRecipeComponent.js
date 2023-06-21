import React, {useEffect, useState} from 'react';
import {FlatList, Image} from 'react-native';
import styled from 'styled-components/native';
import HList from '../../organisms/Home/HList';
import {loadLoginFromStorage} from '../../../services/repository/AutoLogin';
import {getDynamicRecipes} from '../../../services/recipe/Recipe';
import {determinePageEnd} from '../../../utils/determinePageEnd';
import {setFirstClicked} from '../../../store/RecipeHome/FirstFilterClicked';
import {setSituationCategory} from '../../../store/RecipeHome/SituationCategory';
import {setSortCategory} from '../../../store/RecipeHome/SortCategory';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setGoToRecipeHome} from '../../../store/RecipeHome/IsGoToRecipeHome';

const OnePersonRecipeComponent = props => {
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
    await getDynamicRecipes(null, 'NEW', null, 'ONE_PERSON', 0, 4, null)
      .then(res => {
        const data = JSON.parse(res.request._response);
        setData(data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const touchAction = () => {
    dispatch(setFirstClicked({key: 1}));
    dispatch(setSituationCategory('ONE_PERSON'));
    dispatch(setSortCategory(null));
    dispatch(setGoToRecipeHome(true));
    navigation.navigate('Recipe');
  };

  return (
    <HComponentContainer>
      <Header>
        <CustomText>1인 가구 레시피</CustomText>
        <ViewMoreBtn onPress={() => touchAction()}>
          <Image source={require('../../../assets/images/More_Arrow.png')} />
        </ViewMoreBtn>
      </Header>
      <HListView>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{height: 'auto', paddingBottom: '20%'}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={data}
          renderItem={({item}) => {
            return <HList value={item} boardSort={'RECIPE'} />;
          }}
        />
      </HListView>
    </HComponentContainer>
  );
};

const HComponentContainer = styled.View`
  background: white;
  margin-top: 10px;
  padding-top: 10px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 13px;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
`;

const CustomText = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  font-family: 'Pretendard Variable';
  color: #383838;
`;

const ViewMoreBtn = styled.TouchableOpacity``;

const HListView = styled.View`
  padding-left: 5%;
  padding-right: 5%;
`;
export default OnePersonRecipeComponent;

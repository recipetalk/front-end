import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  getEfficacy,
  getIngredientsPrep,
  getMyIngredientPage,
} from '../../../services/Ingredients';
import Line from '../../atoms/Line';
import DList from '../../organisms/Home/DList';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import IngredientsInfo from '../../organisms/Ingredients/IngredientsInfo';
import IngredientsItem from '../../organisms/Ingredients/IngredientsItem';
import {FlatList} from 'react-native';

const PrepComponent = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [efficacyInfo, setEfficacyInfo] = useState({});
  const [ingredientsPrepInfo, setIngredientsPrepInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEfficacy(router.params.ingredientID)
      .then(res => setEfficacyInfo(res.data))
      .catch(error => console.error(error.response));
  }, [isFocused, router.params.ingredientID]);

  useEffect(() => {
    init();
  }, [isFocused, router.params.ingredientID]);

  const init = async () => {
    await setLoading(() => true);
    await getIngredientsPrep(router.params.ingredientID, 0)
      .then(res => {
        const data = JSON.parse(res.request._response);
        setIngredientsPrepInfo(data.content);
        setLast(() => data.last);
        setPage(1);
        console.log(data.content);
      })
      .catch(err => {
        console.log(err.response);
      });
    await setLoading(() => false);
  };

  const onRefresh = async () => {
    await setRefresh(true);
    await init().then();
    setTimeout(() => setRefresh(false), 1000);
  };

  const onRequest = async () => {
    await setLoading(() => true);
    await getIngredientsPrep(router.params.ingredientID, page).then(res => {
      const data = JSON.parse(res.request._response);
      setIngredientsPrepInfo(ingredients => ingredients.concat(data.content));
      setLast(() => data.last);
      setPage(page => page + 1);
    });
    setLoading(() => false);
  };

  return (
    <PrepComponentContainer>
      <IngredientsHeader title="손질법" />
      <IngredientsInfo
        ingredientName={efficacyInfo.ingredientName}
        isEdit={false}
      />

      <FlatList
        ListHeaderComponent={() => (
          <>
            <Line />
            <Header>
              <TitleHighlightText>
                {efficacyInfo.ingredientName}
              </TitleHighlightText>
              <TitleText> 손질법</TitleText>
            </Header>
          </>
        )}
        ListEmptyComponent={
          <>
            <EmptyContainer>
              <EmptyLabel>아직 손질법이 없어요.</EmptyLabel>
              <EmptyLabel>처음으로 손질법을 작성해보시겠어요?</EmptyLabel>
            </EmptyContainer>
          </>
        }
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
        data={ingredientsPrepInfo}
        renderItem={({item}) => (
          <DList
            value={item}
            boardSort={'TRIMMING'}
            ingredientId={router.params.ingredientID}
          />
        )}
        keyExtractor={_ => _?.id}
        onRefresh={onRefresh}
        refreshing={isRefresh}
        onEndReached={() => {
          if (loading) {
            return;
          }
          if (!last) {
            onRequest();
          }
        }}
      />
    </PrepComponentContainer>
  );
};
/*
            <DList
              value={item}
              boardSort={'TRIMMING'}
              ingredientId={router.params.ingredientID}
            />
 */

const EmptyContainer = styled.View`
  padding-top: 100px;
  flex: 1;

  align-items: center;
  justify-content: center;
`;

const EmptyLabel = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: #f09311;
  font-family: 'Pretendard Variable';
`;

const PrepComponentContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 18px 0 18px 18px;
  background-color: #ffffff;
`;

const TitleHighlightText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const TitleText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const TouchContainer = styled.TouchableOpacity``;
export default PrepComponent;

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import IngredientsItem from './IngredientsItem';

const RecentlyRegisteredIngredients = props => {
  const navigation = useNavigation();

  return (
    <>
      <RecentlyRegisteredIngredientsSection>
        <RecentlyRegisteredIngredientsText>
          최근 등록된 식재료
        </RecentlyRegisteredIngredientsText>
        <TouchContainer onPress={() => navigation.navigate('Ingredients')}>
          <ViewAllContainer>
            <ViewAllImage
              source={require('../../../assets/images/Add_o.png')}
            />
            <ViewAllText>전체보기</ViewAllText>
          </ViewAllContainer>
        </TouchContainer>
      </RecentlyRegisteredIngredientsSection>
      <>
        {props.items.length === 0 ? (
          <EmptyItemContainer>
            <EmptyItemText>아직 등록된 식재료가 없어요!</EmptyItemText>
          </EmptyItemContainer>
        ) : (
          props.items.map((item, i) => {
            return <IngredientsItem item={item} key={i} />;
          })
        )}
      </>
    </>
  );
};

const RecentlyRegisteredIngredientsSection = styled.View`
  padding: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RecentlyRegisteredIngredientsText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  color: #333333;
`;

const ViewAllContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ViewAllImage = styled.Image`
  width: 15px;
  height: 15px;
`;

const ViewAllText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const EmptyItemContainer = styled.View`
  margin-top: 150px;
`;

const EmptyItemText = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #a0a0a0;
`;

const TouchContainer = styled.TouchableOpacity``;
export default RecentlyRegisteredIngredients;

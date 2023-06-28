import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useState} from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';
import {deleteIngredient} from '../../../services/Ingredients';
import {OptionModalChildImage} from '../OptionModalChildImage';

const IngredientsItem = props => {
  const navigation = useNavigation();
  const [checkedItem, setCheckedItem] = useState(undefined);

  useEffect(() => {
    if (checkedItem !== undefined) {
      checkedItem.onPress();
    }
  }, [checkedItem]);

  const items = [
    {
      label: '수정',
      value: 'update',
      onPress: () => {
        console.log('수정!!');
        navigation.navigate('IngredientsEdit', {
          id: props.item.userHasIngredientId,
        });
      },
    },
    {
      label: '재료 삭제',
      value: 'delete',
      onPress: () => {
        deleteIngredient(props.item.userHasIngredientId)
          .then(res => {
            console.log('삭제 완료', res);
            props.deleteCallback();
          })
          .catch(error => console.error(error.response));
      },
    },
  ];

  return (
    <IngredientsItemContainer>
      <Header>
        <IngredientsItemInfo>
          <Name>{props.item.ingredientName}</Name>
          <Amount>
            {props.item.state} | {props.item.quantity}
          </Amount>
        </IngredientsItemInfo>
        <TouchContainer>
          <OptionModalChildImage items={items} setCheckedItem={setCheckedItem}>
            <Image source={require('../../../assets/images/More.png')} />
          </OptionModalChildImage>
        </TouchContainer>
      </Header>

      {props?.item.ingredientId != null ? (
        <IngredientsItemETCInfo>
          {/*<TouchContainer*/}
          {/*  onPress={() =>*/}
          {/*    navigation.navigate('Efficacy', {*/}
          {/*      ingredientID: props.item.ingredientId,*/}
          {/*    })*/}
          {/*  }>*/}
          {/*  <EfficacyText>효능 및 정보</EfficacyText>*/}
          {/*</TouchContainer>*/}
          {/*<Text> | </Text>*/}
          <TouchContainer
            onPress={() =>
              navigation.navigate('Prep', {
                ingredientID: props.item.ingredientId,
              })
            }>
            <PrepText>손질법 보기</PrepText>
          </TouchContainer>
        </IngredientsItemETCInfo>
      ) : undefined}
      <ExpirationInfo expirationDate={props?.item?.expirationDate} />
    </IngredientsItemContainer>
  );
};

const IngredientsItemContainer = styled.View`
  background-color: #ffffff;
  border-radius: 3px;
  height: 130px;
  position: relative;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TouchContainer = styled.TouchableOpacity``;

const IngredientsItemInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Name = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #333333;

  margin-right: 10px;
`;

const Amount = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  color: #666666;
`;

const IngredientsItemETCInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
`;

const EfficacyText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;

  font-family: 'Pretendard Variable';
  text-align: center;

  color: #666666;
`;

const PrepText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  font-family: 'Pretendard Variable';
  text-align: center;

  color: #666666;
`;

const ExpirationInfo = ({expirationDate}) => {
  if (expirationDate == null) {
    return undefined;
  }
  const now = new Date().setHours(9);
  const target = new Date(expirationDate);

  console.log(now, ' ', target);

  const term = (target - now) / 1000 / 60 / 60 / 24;

  if (term > 6) {
    return (
      <FreeExpirationInfo>
        <FreeExpirationInfoText>
          소비기한 : {expirationDate}까지
        </FreeExpirationInfoText>
      </FreeExpirationInfo>
    );
  }

  if (term >= 2) {
    return (
      <SpareExpirationInfo>
        <SpareExpirationInfoText>
          소비기한 : {expirationDate}까지
        </SpareExpirationInfoText>
      </SpareExpirationInfo>
    );
  }

  if (term >= -1) {
    return (
      <ImmiExpirationInfo>
        <ImmiExpirationInfoText>
          소비기한 : {expirationDate}까지
        </ImmiExpirationInfoText>
      </ImmiExpirationInfo>
    );
  }

  if (term < -1) {
    return (
      <ExpiredExpirationInfo>
        <ExpiredExpirationInfoText>
          소비기한 : {expirationDate}까지
        </ExpiredExpirationInfoText>
      </ExpiredExpirationInfo>
    );
  }
};

//지남 (블랙계열)
const ExpiredExpirationInfo = styled.View`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  gap: 10px;

  background-color: #e5e5e5;
  border-radius: 70px;
`;

const ExpiredExpirationInfoText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  font-family: 'Pretendard Variable';

  color: #333333;
  text-align: center;
`;

//임박 (빨간색계열)
const ImmiExpirationInfo = styled.View`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  gap: 10px;

  background-color: #fac7c3;
  border-radius: 70px;
`;

const ImmiExpirationInfoText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  font-family: 'Pretendard Variable';

  color: #e01300;
  text-align: center;
`;
//여유 (주황색) => 그대로
const SpareExpirationInfo = styled.View`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  gap: 10px;

  background-color: #fff4e6;
  border-radius: 70px;
`;

const SpareExpirationInfoText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  font-family: 'Pretendard Variable';

  color: #f09311;
  text-align: center;
`;

// 더 여유 (초록색)
const FreeExpirationInfo = styled.View`
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  gap: 10px;

  background-color: #c3f9d0;
  border-radius: 70px;
`;

const FreeExpirationInfoText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  font-family: 'Pretendard Variable';

  color: #34e045;
  text-align: center;
`;
export default memo(IngredientsItem);

import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {addRowIngredientTrimming} from '../../../services/Ingredients';
import {addEmptyPrep, addPrep} from '../../../store/Ingredients/PrepSlice';
import Line from '../../atoms/Line';
import IngredientsHeader from '../../organisms/Ingredients/IngredientsHeader';
import PrepIntro from '../../organisms/Ingredients/PrepIntro';
import PrepOrderItem from '../../organisms/Ingredients/PrepOrderItem';

const PrepRegisterComponent = () => {
  const dispatch = useDispatch();
  const prepResult = useSelector(state => state.prep);
  console.log(`prepResult is ${JSON.stringify(prepResult)}`);

  const [prepInfo, setPrepInfo] = useState({
    title: '',
    desc: '',
    img: '',
  });

  const [itemData, setItemData] = useState({});
  const [itemList, setItemList] = useState([]);

  const addEmptyPrepOrder = () => {
    if (prepResult.length !== 0) {
      // input 값 state 저장하도록 해주는 함수
      addPrepOrder();
    }

    dispatch(addEmptyPrep());
  };

  const endHandler = () => {
    setItemList([...itemList, itemData]);
  };

  const addPrepOrder = () => {
    dispatch(
      addPrep({
        trimmingSeq: itemData.trimmingSeq,
        description: itemData.description,
        img: itemData.img,
      }),
    );
  };

  // 모든 데이터 저장하는 함수
  const registerPrepOrder = () => {
    // addPrepOrder();

    // dispatch(
    //   registerPrep({
    //     title: prepInfo.title,
    //     desc: prepInfo.desc,
    //     descImg: '',
    //     prepOrderList: prepResult,
    //   }),
    // );

    addRowIngredientTrimming(itemList)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
    // addIngredientTrimming({
    //   ingredientId: 1,
    //   title: prepInfo.title,
    //   desc: prepInfo.desc,
    //   img: '',
    // }).then(res => {
    //   console.log('!!', res.data);
    // });
  };

  return (
    <>
      <IngredientsHeader title="손질법" isTitleOnly={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PrepIntro state={prepInfo} setState={setPrepInfo} />
        <Line />

        <PrepOrderContainer>
          <OrderTitle>손질 순서</OrderTitle>
          {prepResult.map((item, index) => {
            return (
              <PrepOrderItem
                item={item}
                key={index}
                index={item.trimmingSeq}
                endHandler={endHandler}
                setItemData={setItemData}
              />
            );
          })}
        </PrepOrderContainer>
        <Line />

        <AddPrepOrder>
          <AddPrepOrderText>손질 순서 추가</AddPrepOrderText>
          <TouchContainer onPress={addEmptyPrepOrder}>
            <AddImage source={require('../../../assets/images/Add_o.png')} />
          </TouchContainer>
        </AddPrepOrder>
        <Line />

        <BtnContainer>
          <CancelBtn>
            <CancelText>취소</CancelText>
          </CancelBtn>
          <SaveBtn onPress={registerPrepOrder}>
            <SaveText>저장</SaveText>
          </SaveBtn>
        </BtnContainer>
      </ScrollView>
    </>
  );
};

const PrepOrderContainer = styled.View`
  margin-bottom: 20px;
`;

const OrderTitle = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  font-family: 'Pretendard Variable';

  color: #333333;
  padding: 18px;
`;

const AddPrepOrder = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
`;

const AddPrepOrderText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  font-family: 'Pretendard Variable';
  color: #f09311;
`;

const TouchContainer = styled.TouchableOpacity``;
const AddImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  padding: 18px;
`;

const CancelBtn = styled.TouchableOpacity`
  width: 80px;
  height: 50px;
  background: #e1e1e1;
  border-radius: 8px;
  justify-content: center;
`;

const CancelText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #666666;
  font-family: 'Pretendard Variable';
`;

const SaveBtn = styled.TouchableOpacity`
  width: 80px;
  height: 50px;
  background: #f09311;
  border-radius: 8px;
  justify-content: center;
`;

const SaveText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  font-family: 'Pretendard Variable';
`;

export default PrepRegisterComponent;

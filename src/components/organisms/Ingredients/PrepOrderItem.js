import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {deletePrep} from '../../../store/Ingredients/PrepSlice';

const PrepOrderItem = props => {
  const dispatch = useDispatch();
  const [resText, setResText] = useState('');

  const deletePreOrder = () => {
    dispatch(deletePrep(props.item.id));
  };

  return (
    <PrepOrderSection>
      <PrepOrderNum>
        <PrepOrderNumText>{props.index}</PrepOrderNumText>
      </PrepOrderNum>
      <PrepOrderInfo>
        <PrepOrderHeader>
          <PrepOrderContent>
            <TitleInput
              placeholder={'예) 준비된 양념으로 고기를 조물조물 재워둡니다.'}
              multiline={true}
              value={resText}
              onChangeText={res => setResText(res)}
            />
          </PrepOrderContent>

          <TouchContainer onPress={deletePreOrder}>
            <PrepOrderCancel
              source={require('../../../assets/images/Cancel.png')}
            />
          </TouchContainer>
        </PrepOrderHeader>
        <PrepOrderAddImage>
          {[1, 2, 3].map(i => {
            return (
              <View key={i}>
                <AddImageItem />
                <AddImgView>
                  <AddImg
                    source={require('../../../assets/images/Add_g.png')}
                  />
                </AddImgView>
              </View>
            );
          })}
        </PrepOrderAddImage>
      </PrepOrderInfo>
    </PrepOrderSection>
  );
};

const TitleInput = styled.TextInput`
  width: 100%;
  margin-bottom: 10px;
  font-family: 'Pretendard Variable';
`;

const PrepOrderSection = styled.View`
  display: flex;
  flex-direction: row;
  height: 140px;
  margin: 15px;
`;

const PrepOrderNum = styled.View`
  width: 22px;
  height: 22px;
  background-color: #f09311;
  border-radius: 50px;
  justify-content: center;
  margin-right: 15px;
  top: 65px;
`;

const PrepOrderNumText = styled.Text`
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  font-family: 'Pretendard Variable';

  color: #ffffff;
`;

const PrepOrderInfo = styled.View`
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
`;

const PrepOrderHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`;

const PrepOrderContent = styled.View`
  width: 200px;
  height: 50px;d
`;

const PrepOrderContentText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
`;

const PrepOrderCancel = styled.Image`
  width: 22px;
  height: 22px;
`;

const PrepOrderAddImage = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 0 10px;
  gap: 10px;
`;

const AddImageItem = styled.View`
  width: 65px;
  height: 65px;
  background-color: #ededed;
  border-radius: 8px;
`;

const AddImgView = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border-radius: 4px;
  position: absolute;
  justify-content: center;
`;
const AddImg = styled.Image`
  margin: auto;
`;

const TouchContainer = styled.TouchableOpacity``;
export default PrepOrderItem;

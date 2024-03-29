import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const RecipeOrderComponent = ({value, datas}) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(value);
  }, []);

  const maxValue = useMemo(() => {
    return Math.max.apply(
      Math,
      datas?.map(data => data.seqNum),
    );
  }, [value.datas]);

  return (
    <PrepOrderItem>
      <NumberPart>
        <NumberText>{value.seqNum}</NumberText>
      </NumberPart>
      <InfoPart>
        <TextPart>{value.description}</TextPart>
        {value.imgUri != null && value.imgUri != '' ? (
          <ImagePart source={{uri: value.imgUri}} />
        ) : undefined}
        <TouchContainer
          onPress={() =>
            navigation.push('SequenceDetailScreen', {
              index: value.seqNum,
              item: datas,
              lastIndex: maxValue,
            })
          }>
          <MorePart>
            <MoreImg source={require('../../assets/images/Find_g.png')} />
            <MoreText>자세히보기</MoreText>
          </MorePart>
        </TouchContainer>
      </InfoPart>
    </PrepOrderItem>
  );
};

const PrepOrderItem = styled.View`
  display: flex;
  flex-direction: row;

  width: 100%;

  margin: auto;
  margin-bottom: 50px;
  justify-content: center;
`;

const NumberPart = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f09311;
  border-radius: 50px;
  margin-right: 10px;
  justify-content: center;
`;

const NumberText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  font-family: 'Pretendard Variable';
  color: #ffffff;
`;

const InfoPart = styled.View``;

const TextPart = styled.Text`
  width: 310px;
  height: auto;
  margin-bottom: 10px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;

const ImagePart = styled.Image`
  width: 310px;
  height: 140px;
  background-color: gray;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const MorePart = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: flex-end;
`;

const MoreText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';
  color: #a0a0a0;
`;

const MoreImg = styled.Image`
  width: 15px;
  height: 15px;
`;

const TouchContainer = styled.TouchableOpacity``;

export default RecipeOrderComponent;

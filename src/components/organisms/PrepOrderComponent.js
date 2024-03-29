import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const PrepOrderComponent = props => {
  const navigation = useNavigation();

  const maxValue = useMemo(() => {
    return Math.max.apply(
      Math,
      props.items?.map(data => data.trimmingSeq),
    );
  }, [props.items]);

  return (
    <PrepOrderItem>
      <NumberPart>
        <NumberText>{props.value.trimmingSeq}</NumberText>
      </NumberPart>
      <InfoPart>
        <TextPart>{props.value.description}</TextPart>
        <ImagePart source={{url: `${props.value.imgUri}`}} />
        <TouchContainer
          onPress={() =>
            navigation.push('SequenceDetailScreen', {
              index: props.value.trimmingSeq,
              item: props.items,
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
  height: 280px;
  margin: auto;
  margin-bottom: 15px;
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
  background-color: white;
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

export default PrepOrderComponent;

import React from 'react';
import styled from 'styled-components/native';

const FollowingComponent = ({
  followingNumber,
  followerNumber,
  recipeNumber,
}) => {
  return (
    <MyInfoContainer>
      <MyInfoItem>
        <MyInfoTitleLabel>팔로잉</MyInfoTitleLabel>
        <MyInfoNumberLabel>{followingNumber}</MyInfoNumberLabel>
      </MyInfoItem>
      <MyInfoItem>
        <MyInfoTitleLabel>팔로워</MyInfoTitleLabel>
        <MyInfoNumberLabel>{followerNumber}</MyInfoNumberLabel>
      </MyInfoItem>
      <MyInfoItem>
        <MyInfoTitleLabel>나의 레시피</MyInfoTitleLabel>
        <MyInfoNumberLabel>{recipeNumber}</MyInfoNumberLabel>
      </MyInfoItem>
    </MyInfoContainer>
  );
};

const MyInfoContainer = styled.View`
  width: 90%;
  height: auto;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
`;

const MyInfoTitleLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #666666;
  font-family: 'Pretendard Variable';
`;

const MyInfoNumberLabel = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #333333;
  font-family: 'Pretendard Variable';
`;

const MyInfoItem = styled.TouchableOpacity`
  width: 30%;
  align-items: center;
`;

export default FollowingComponent;

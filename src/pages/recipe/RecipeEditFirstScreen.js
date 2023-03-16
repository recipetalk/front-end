import React from 'react';
import styled from 'styled-components/native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {Image, TextInput} from 'react-native';

const RecipeEditFirstScreen = ({navigation}) => {
  return (
    <RecipeEditScreenContainer>
      <Title
        nowStep={1}
        totalStep={3}
        navigation={navigation}
        nextNavigation={'RecipeEditSecondScreen'}
      />
      <ScrollPart>
        <ThumbnailImageEditContainer>
          <ImageSelectBox>
            <Image source={require('../../assets/images/_격리_모드.png')} />
          </ImageSelectBox>
          <ImageEditDescriptContainer>
            <CookingSectionLabel>대표 이미지 선택</CookingSectionLabel>
            <Description>{`레시피를 대표할 수 있는
음식사진을 올려주세요`}</Description>
          </ImageEditDescriptContainer>
          <TouchableBox>
            <ImageSelectLabel>선택</ImageSelectLabel>
          </TouchableBox>
        </ThumbnailImageEditContainer>
        <EditPart>
          <TitleTextInput placeholder="제목" placeholderTextColor="#a4a4a4" />
          <DescriptionTextInput
            placeholder={`레시피를 소개해주세요.
예) 자취 8년차 언제 먹어도 질리지 않는 맛있는 된장찌개!`}
            placeholderTextColor="#a4a4a4"
            multiline={true}
            scrollEnabled={false}
          />
        </EditPart>
        <CookingInfoPart>
          <PartTitleLabel>요리 정보</PartTitleLabel>
          <CookingSectionPart>
            <CookingSectionLabel>인원</CookingSectionLabel>
            <DummyTextInput placeholder="1인분" />
          </CookingSectionPart>
          <HorizontalBar height={'1px'} />
          <CookingSectionPart>
            <CookingSectionLabel>시간</CookingSectionLabel>
            <DummyTextInput placeholder="5분 이내" />
          </CookingSectionPart>
          <HorizontalBar height={'1px'} />
          <CookingSectionPart>
            <CookingSectionLabel>난이도</CookingSectionLabel>
            <DummyTextInput placeholder="아무나" />
          </CookingSectionPart>
        </CookingInfoPart>
        <CategoryInfoPart>
          <PartTitleLabel>카테고리 선택</PartTitleLabel>
          <CategorySelectorContainer>
            <DummyTextInput placeholder="종류별" />
            <DummyTextInput placeholder="상황별" />
          </CategorySelectorContainer>
        </CategoryInfoPart>
        <HashtagInfoPart>
          <CookingSectionLabel>해시태그</CookingSectionLabel>
          <Description>{`주재료, 목적, 효능, 대상 등을 ~~
예) 돼지고기, 다이어트, 비만, 칼슘, 감기예방`}</Description>
          <HashtagInput
            placeholder="#태그 입력(최대 10개)"
            placeholderTextColor={'#a0a0a0'}
          />
          <HashtagItemContainer>
            <HashtagItem>
              <HashtagItemLabel>#한식</HashtagItemLabel>
              <HashtagCancelTouchable>
                <HashtagCancelImg
                  source={require('../../assets/images/Cancel.png')}
                />
              </HashtagCancelTouchable>
            </HashtagItem>

            <HashtagItem>
              <HashtagItemLabel>#건강한식</HashtagItemLabel>
              <HashtagCancelTouchable>
                <HashtagCancelImg
                  source={require('../../assets/images/Cancel.png')}
                />
              </HashtagCancelTouchable>
            </HashtagItem>

            <HashtagItem>
              <HashtagItemLabel>#하윤맘레시피</HashtagItemLabel>
              <HashtagCancelTouchable>
                <HashtagCancelImg
                  source={require('../../assets/images/Cancel.png')}
                />
              </HashtagCancelTouchable>
            </HashtagItem>

            <HashtagItem>
              <HashtagItemLabel>#건강한식</HashtagItemLabel>
              <HashtagCancelTouchable>
                <HashtagCancelImg
                  source={require('../../assets/images/Cancel.png')}
                />
              </HashtagCancelTouchable>
            </HashtagItem>
          </HashtagItemContainer>
        </HashtagInfoPart>
      </ScrollPart>
    </RecipeEditScreenContainer>
  );
};

const ImageSelectLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #f09311;
  text-align: right;
  font-family: 'Pretendard Variable';
`;

const RecipeEditScreenContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const ImageEditDescriptContainer = styled.View`
  gap: 10px;
`;

const ImageSelectBox = styled.TouchableOpacity`
  width: 98px;
  height: 98px;
  background: #ededed;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const TouchableBox = styled.TouchableOpacity`
  width: 90px;
  height: 98px;
  justify-content: center;
`;

const Description = styled.Text`
  color: #a0a0a0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';
`;

const DummyTextInput = styled.TextInput`
  border: 1px solid #d8d8d8;
  width: 40%;
  font-family: 'Pretendard Variable';
  border-radius: 8px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  padding: 3px;
`;

const CategorySelectorContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ThumbnailImageEditContainer = styled.View`
  width: 100%;
  height: 120px;
  background: #ffffff;
  margin-bottom: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  gap: 15px;
`;

const EditPart = styled.View`
  background: #ffffff;
  width: 100%;
  padding: 15px;
  min-height: 360px;
  margin-bottom: 6px;
`;

const TitleTextInput = styled.TextInput`
  font-weight: 500;
  font-size: 24px;
  width: 90%;
  font-family: 'Pretendard Variable';
`;

const DescriptionTextInput = styled.TextInput`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  height: auto;
  text-align-vertical: top;
  font-family: 'Pretendard Variable';
  color: #666666;
`;

const CookingInfoPart = styled.View`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  height: auto;
  background: #ffffff;
  margin-bottom: 6px;
`;

const CookingSectionLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  font-family: 'Pretendard Variable';
`;

const CookingSectionPart = styled.View`
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const CategoryInfoPart = styled.View`
  width: 100%;
  padding: 15px;
  background: #ffffff;
  margin-bottom: 1px;
`;

const HashtagInfoPart = styled.View`
  width: 100%;
  padding: 15px;
  background: #ffffff;

  gap: 15px;
`;

const HashtagInput = styled.TextInput`
  width: 100%;
  background: #f5f5f5;
  color: #a0a0a0;
  padding: 10px;
  border-radius: 8px;
  font-family: 'Pretendard Variable';
`;

const HashtagItem = styled.View`
  border: 1px solid #d8d8d8;
  border-radius: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  gap: 5px;
`;

const HashtagItemLabel = styled.Text`
  color: #666666;
  font-family: 'Pretendard Variable';
`;

const HashtagCancelTouchable = styled.TouchableOpacity``;

const HashtagCancelImg = styled.Image``;

const HashtagItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const PartTitleLabel = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;

  font-family: 'Pretendard Variable';

  color: #333333;
`;

const ScrollPart = styled.ScrollView`
  margin-top: 3px;
`;

const HorizontalBar = styled.View`
  background: #e1e1e1;
  width: 100%;
  height: ${props => props.height};
`;

export default RecipeEditFirstScreen;

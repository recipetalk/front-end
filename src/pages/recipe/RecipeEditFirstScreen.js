import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Title from '../../components/atoms/board/recipe/edit/Title';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ImageAndCameraFun} from '../../components/atoms/functions/ImageAndCameraFun';
import {useToast} from 'react-native-toast-notifications';
import {RecipeQuantityList} from '../../category/recipe/RecipeQuantityList';
import {RecipeTimeList} from '../../category/recipe/RecipeTimeList';
import {RecipeLevelList} from '../../category/recipe/RecipeLevelList';
import {RecipeSortList} from '../../category/recipe/RecipeSortList';
import {RecipeSituationList} from '../../category/recipe/RecipeSituationList';
import ModalDropDownPickerComponent from '../../components/molecules/ModalDropDownPickerComponent';

const RecipeEditFirstScreen = ({navigation}) => {
  const [isAlert, setAlert] = useState(false);
  const [photo, setPhoto] = useState({uri: ''});
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [chooseQuantityNum, setQuantityNum] = useState(0);
  const [chooseTimeNum, setTimeNum] = useState(0);
  const [chooseLevelNum, setLevelNum] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [firstCategoryValue, setFirstCategoryValue] = useState(null);
  const [secondCategoryValue, setSecondCategoryValue] = useState(null);
  useEffect(() => {
    if (
      title.trim() !== '' &&
      description.trim() !== '' &&
      firstCategoryValue !== null
    ) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [title, description, firstCategoryValue, secondCategoryValue]);

  const toast = useToast();

  return (
    <RecipeEditScreenContainer>
      <ImageAndCameraFun
        isAlert={isAlert}
        setAlert={setAlert}
        setPhoto={setPhoto}
        toast={toast}
      />
      <Title
        nowStep={1}
        totalStep={3}
        navigation={navigation}
        nextNavigation={'RecipeEditSecondScreen'}
        enabled={enabled}
      />
      <ScrollPart>
        <ThumbnailImageEditContainer>
          {photo.uri === '' ? (
            <ImageSelectBox onPress={() => setAlert(true)}>
              <Image source={require('../../assets/images/_격리_모드.png')} />
            </ImageSelectBox>
          ) : (
            <TouchableOpacity onPress={() => setAlert(true)}>
              <Image
                style={{width: 98, height: 98, borderRadius: 8}}
                source={{uri: photo.uri}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          <ImageEditDescriptContainer>
            <CookingSectionLabel>대표 이미지 선택</CookingSectionLabel>
            <Description>{`레시피를 대표할 수 있는
음식사진을 올려주세요`}</Description>
          </ImageEditDescriptContainer>
          <TouchableBox onPress={() => setAlert(true)}>
            <ImageSelectLabel>선택</ImageSelectLabel>
          </TouchableBox>
        </ThumbnailImageEditContainer>
        <EditPart>
          <TitleTextInput
            placeholder="제목"
            placeholderTextColor="#a4a4a4"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <DescriptionTextInput
            placeholder={`레시피를 소개해주세요.
예) 자취 8년차 언제 먹어도 질리지 않는 맛있는 된장찌개!`}
            placeholderTextColor="#a4a4a4"
            multiline={true}
            scrollEnabled={false}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </EditPart>
        <CookingInfoPart>
          <PartTitleLabel>요리 정보</PartTitleLabel>
          <CookingSectionPart>
            <CookingSectionLabel>인원</CookingSectionLabel>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <TouchableOpacity
                onPress={() =>
                  setQuantityNum(quantityNum =>
                    quantityNum === 0
                      ? RecipeQuantityList.length - 1
                      : quantityNum - 1,
                  )
                }>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/images/Minus.png')}
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  width: 112,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    backgroundColor: '#f5f5f5',
                    fontStyle: 'normal',
                    fontFamily: 'Pretendard Variable',
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#666666',
                  }}>
                  {RecipeQuantityList[chooseQuantityNum].label}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  setQuantityNum(quantityNum =>
                    quantityNum === RecipeQuantityList.length - 1
                      ? 0
                      : quantityNum + 1,
                  )
                }>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/images/Plus.png')}
                />
              </TouchableOpacity>
            </View>
          </CookingSectionPart>
          <HorizontalBar height={'1px'} />
          <CookingSectionPart>
            <CookingSectionLabel>시간</CookingSectionLabel>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <TouchableOpacity
                onPress={() =>
                  setTimeNum(chooseTimeNum =>
                    chooseTimeNum === 0
                      ? RecipeTimeList.length - 1
                      : chooseTimeNum - 1,
                  )
                }>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/images/Minus.png')}
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  width: 112,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    backgroundColor: '#f5f5f5',
                    fontStyle: 'normal',
                    fontFamily: 'Pretendard Variable',
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#666666',
                  }}>
                  {RecipeTimeList[chooseTimeNum].label}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  setTimeNum(timeNum =>
                    timeNum === RecipeTimeList.length - 1 ? 0 : timeNum + 1,
                  )
                }>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/images/Plus.png')}
                />
              </TouchableOpacity>
            </View>
          </CookingSectionPart>
          <HorizontalBar height={'1px'} />
          <CookingSectionPart>
            <CookingSectionLabel>난이도</CookingSectionLabel>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <TouchableOpacity
                onPress={() =>
                  setLevelNum(levelNum =>
                    levelNum === 0 ? RecipeLevelList.length - 1 : levelNum - 1,
                  )
                }>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/images/Minus.png')}
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  width: 112,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    backgroundColor: '#f5f5f5',
                    fontStyle: 'normal',
                    fontFamily: 'Pretendard Variable',
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#666666',
                  }}>
                  {RecipeLevelList[chooseLevelNum].label}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  setLevelNum(levelNum =>
                    levelNum === RecipeLevelList.length - 1 ? 0 : levelNum + 1,
                  )
                }>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/images/Plus.png')}
                />
              </TouchableOpacity>
            </View>
          </CookingSectionPart>
        </CookingInfoPart>
        <CategoryInfoPart>
          <PartTitleLabel>카테고리 선택</PartTitleLabel>
          <CategorySelectorContainer>
            <TouchableWithoutFeedback>
              <ModalDropDownPickerComponent
                value={firstCategoryValue}
                setValue={setFirstCategoryValue}
                items={RecipeSortList}
                placeholder={'종류별'}
                minHeight={'40px'}
                width={'40%'}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <ModalDropDownPickerComponent
                value={secondCategoryValue}
                setValue={setSecondCategoryValue}
                items={RecipeSituationList}
                placeholder={'상황별'}
                minHeight={'40px'}
                width={'40%'}
              />
            </TouchableWithoutFeedback>
          </CategorySelectorContainer>
        </CategoryInfoPart>
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
  align-items: center;
  position: absolute;
  right: 0;
`;

const Description = styled.Text`
  color: #a0a0a0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Pretendard Variable';
`;

const CategorySelectorContainer = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 10px;
  justify-content: center;
  height: 100px;
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
  color: #333333;
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
  gap: 5px;
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

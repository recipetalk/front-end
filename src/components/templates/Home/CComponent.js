import React from 'react';
import styled from 'styled-components/native';
import CItem from '../../organisms/Home/CItem';

const CComponent = () => {
  const data = [
    {
      key: 1,
      sort: null,
      firstClicked: {key: 1},
      situation: 'ONE_PERSON',
      labelText: '1인 가구',
      imageURI: require('../../../assets/images/일인가구Icon.png'),
    },
    {
      key: 2,
      sort: null,
      firstClicked: {key: 1},
      situation: 'VERY_EASY',
      labelText: '5분 완성',
      imageURI: require('../../../assets/images/5분완성Icon.png'),
    },
    {
      key: 3,
      sort: null,
      firstClicked: {key: 1},
      situation: 'DIET',
      labelText: '다이어트',
      imageURI: require('../../../assets/images/다이어트Icon.png'),
    },
    {
      key: 4,
      sort: null,
      firstClicked: {key: 1},
      situation: 'STRESS_FREE',
      labelText: '스트레스 해소',
      imageURI: require('../../../assets/images/스트레스해소Icon.png'),
    },
    {
      key: 5,
      sort: null,
      firstClicked: {key: 1},
      situation: 'PARTY',
      labelText: '파티',
      imageURI: require('../../../assets/images/파티Icon.png'),
    },
    {
      key: 6,
      sort: null,
      firstClicked: {key: 1},
      situation: 'HEALTHY',
      labelText: '건강식',
      imageURI: require('../../../assets/images/건강식Icon.png'),
    },
    {
      key: 7,
      sort: '반찬',
      firstClicked: {key: 1},
      situation: null,
      labelText: '반찬',
      imageURI: require('../../../assets/images/반찬Icon.png'),
    },
    {
      key: 8,
      sort: '안주',
      firstClicked: {key: 1},
      situation: null,
      labelText: '안주',
      imageURI: require('../../../assets/images/안주Icon.png'),
    },
    {
      key: 9,
      sort: '고기',
      firstClicked: {key: 1},
      situation: null,
      labelText: '고기',
      imageURI: require('../../../assets/images/고기Icon.png'),
    },
    {
      key: 10,
      sort: null,
      firstClicked: {key: 1},
      situation: null,
      labelText: '더보기',
      imageURI: require('../../../assets/images/더보기Icon.png'),
    },
  ];
  return (
    <CComponentContainer>
      {data.map(v => (
        <CItem
          firstClicked={v.firstClicked}
          sort={v.sort}
          situation={v.situation}
          imgURL={v.imageURI}
          labelText={v.labelText}
        />
      ))}
    </CComponentContainer>
  );
};

const CComponentContainer = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const CustomText = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
const CustomView = styled.View`
  width: 100%;
  height: 170px;

  border-radius: 8px;
  border: 1px solid black;
  margin: auto;
`;
export default CComponent;

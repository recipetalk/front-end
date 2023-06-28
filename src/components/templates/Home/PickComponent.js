import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import FItem from '../../organisms/Home/FItem';
import {getRecipePick} from '../../../services/recipe/Recipe';
import {useNavigation} from '@react-navigation/native';

const PickComponent = props => {
  const [data, setData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (props?.isRefresh) {
      init();
    }
  }, [props.isRefresh]);

  const init = async () => {
    await getRecipePick()
      .then(res => {
        const data = JSON.parse(res.request._response);
        console.log('Pick ', data);
        setData(...data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <FComponentContainer>
      <Header>
        <CustomText>PICK 레시피</CustomText>
        <ViewMoreBtn onPress={() => navigation.push('MyBookmark')}>
          <Image source={require('../../../assets/images/More_Arrow.png')} />
        </ViewMoreBtn>
      </Header>
      <FItem value={data} />
    </FComponentContainer>
  );
};

const FComponentContainer = styled.View`
  padding-bottom: 30px;
  background: white;
  margin-top: 10px;
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CustomText = styled.Text`
  font-family: 'Pretendard Variable';
  color: #383838;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
`;

const ViewMoreBtn = styled.TouchableOpacity``;

export default PickComponent;

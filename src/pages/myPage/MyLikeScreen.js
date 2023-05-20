import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../components/atoms/board/RadioButton';
import DropDownPickerComponent from '../../components/molecules/DropDownPickerComponent';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import DList from '../../components/organisms/Home/DList';
import {FlatList, TouchableOpacity} from 'react-native';
import {loadLoginFromStorage} from '../../services/repository/AutoLogin';
import {getDynamicRecipes} from '../../services/recipe/Recipe';
import {determinePageEnd} from '../../utils/determinePageEnd';
import {getBoardLikeList} from '../../services/MyPage';
import HList from '../../components/organisms/Home/HList';
import {toggleBoardLikeAction} from '../../services/BoardLike';

export const MyLikeScreen = ({navigation}) => {
  const [boardLike, setBoardLike] = useState([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(() => true);
    await getBoardLikeList(0)
      .then(res => {
        const data = JSON.parse(res.request._response);
        setBoardLike(() => data.content);
        setLast(() => data.last);
        setPage(() => 1);
      })
      .catch(err => {
        console.log(err.response);
      });
    setLoading(() => false);
  };

  const onRefresh = async () => {
    await setRefresh(true);
    await init().then(() => setRefresh(false));
  };

  const onRequest = async () => {
    await setLoading(() => true);
    await getBoardLikeList(page).then(res => {
      const data = JSON.parse(res.request._response);
      setBoardLike(boardLikes => boardLikes.concat(data.content));
      setLast(() => data.last);
      setPage(page => page + 1);
    });
    setLoading(() => false);
  };

  return (
    <>
      <Container edges={['top']} />
      <NavigationHeader navigation={navigation} title={'나의 좋아요'} />
      <HorizontalBar />
      <FlatList
        style={{backgroundColor: 'white'}}
        data={boardLike}
        renderItem={({item}) => {
          return <CustomDList value={item} />;
        }}
        keyExtractor={_ => _.boardId}
        onRefresh={onRefresh}
        refreshing={isRefresh}
        onEndReached={() => {
          if (loading) {
            return;
          }
          if (!last) {
            onRequest();
          }
        }}
        onEndReachedThreshold={0.6}
      />
    </>
  );
};

const CustomDList = ({value}) => {
  const [isLiked, setLiked] = useState(value?.isLiked);

  const onRequest = async () => {
    toggleBoardLikeAction(value?.boardId).then(res => {
      const data = JSON.parse(res.request._response);
      setLiked(data.isLiked);
    });
  };

  return (
    <CustomDListContainer>
      <DList value={value} />
      <TouchableOpacity onPress={() => onRequest()}>
        {isLiked ? (
          <LikeImage source={require('../../assets/images/LikeTrue.png')} />
        ) : (
          <LikeImage source={require('../../assets/images/LikeFalse.png')} />
        )}
      </TouchableOpacity>
    </CustomDListContainer>
  );
};

const CustomDListContainer = styled.View`
  width: 100%;
  position: relative;
`;

const LikeImage = styled.Image`
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 10px;
  right: 5%;
`;

const Container = styled.SafeAreaView`
  background: white;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;

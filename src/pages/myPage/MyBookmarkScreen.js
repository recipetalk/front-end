import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import RadioButton from '../../components/atoms/board/RadioButton';
import DropDownPickerComponent from '../../components/molecules/DropDownPickerComponent';
import {NavigationHeader} from '../../components/organisms/mypage/NavigationHeader';
import DList from '../../components/organisms/Home/DList';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {getBoardBookmarkList, getBoardLikeList} from '../../services/MyPage';
import {toggleBoardLikeAction} from '../../services/BoardLike';
import {toggleBoardBookmark} from '../../services/BoardBookmark';

export const MyBookmarkScreen = ({navigation}) => {
  const [firstClicked, setFirstClicked] = useState({key: 1});
  const [bookmark, setBookmark] = useState(null);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const dummy = [1, 2, 3, 4, 5];
  const firstFilter = [
    {
      key: 1,
      onPress: () => setFirstClicked({key: 1}),
      title: '최신',
      value: 'NEW',
    },
    {
      key: 2,
      onPress: () => setFirstClicked({key: 2}),
      title: '인기',
      value: 'POPULAR',
    },
  ];

  useEffect(() => {
    init();
  }, [firstClicked]);

  const init = async () => {
    setLoading(() => true);
    await getBoardBookmarkList(0, firstFilter[firstClicked.key - 1].value)
      .then(res => {
        const data = JSON.parse(res.request._response);
        setBookmark(() => data.content);
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
    await getBoardBookmarkList(
      page,
      firstFilter[firstClicked.key - 1].value,
    ).then(res => {
      const data = JSON.parse(res.request._response);
      setBookmark(boardLikes => boardLikes.concat(data.content));
      setLast(() => data.last);
      setPage(page => page + 1);
    });
    setLoading(() => false);
  };

  if (bookmark == null) {
    return (
      <>
        <Container edges={['top']} />
        <NavigationHeader navigation={navigation} title={'나의 북마크'} />
        <HorizontalBar />
        <FilterPart>
          {firstFilter.map(value => (
            <RadioButton
              onPress={value.onPress}
              backgroundColor={'#D8D8D8'}
              clickedBackgroundColor={'#666666'}
              textColor={'#666666'}
              clickedTextColor={'#D8D8D8'}
              clickedNumber={firstClicked.key}
              item={value}
            />
          ))}
        </FilterPart>
        <ActivityIndicator color={'#f09311'} size="large" />
      </>
    );
  }

  return (
    <>
      <Container edges={['top']} />
      <NavigationHeader navigation={navigation} title={'나의 북마크'} />
      <HorizontalBar />
      <FilterPart>
        {firstFilter.map(value => (
          <RadioButton
            onPress={value.onPress}
            backgroundColor={'#D8D8D8'}
            clickedBackgroundColor={'#666666'}
            textColor={'#666666'}
            clickedTextColor={'#D8D8D8'}
            clickedNumber={firstClicked.key}
            item={value}
          />
        ))}
      </FilterPart>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={bookmark}
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
  const [isBookmarked, setBookmarked] = useState(value?.isBookmarked);

  const onRequest = async () => {
    toggleBoardBookmark(value?.boardId).then(res => {
      const data = JSON.parse(res.request._response);
      setBookmarked(data.isBookmarked);
    });
  };

  return (
    <CustomDListContainer>
      <DList value={value} boardSort={value?.boardSort} />
      <TouchableOpacity onPress={() => onRequest()}>
        {isBookmarked ? (
          <BookmarkImage
            source={require('../../assets/images/BookmarkTrue.png')}
          />
        ) : (
          <BookmarkImage
            source={require('../../assets/images/BookmarkFalse.png')}
          />
        )}
      </TouchableOpacity>
    </CustomDListContainer>
  );
};

const CustomDListContainer = styled.View`
  width: 100%;
  position: relative;
`;

const BookmarkImage = styled.Image`
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 10px;
  right: 5%;
`;

const DropdownContainer = styled.View``;

const Container = styled.SafeAreaView`
  background: white;
`;

const VerticalBar = styled.View`
  border: 1px solid #d8d8d8;
  height: 30px;
  margin-left: 5px;
  margin-right: 10px;
`;
const FilterPart = styled.View`
  width: auto;
  height: auto;
  flex-direction: row;
  padding-top: 10px;
  padding-left: 5%;
  padding-right: 5%;
  background-color: white;
`;

const HorizontalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
`;
const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  align-items: center;
  background: white;
  margin-bottom: 70px;
`;

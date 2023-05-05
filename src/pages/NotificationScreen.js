import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {NavigationHeader} from '../components/organisms/mypage/NavigationHeader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NotificationSortList} from '../category/notification/NotificationSortList';
import CreatedDateLabel from '../components/atoms/CreatedDateLabel';
import {getNotifications} from '../services/Notification';
import {useDispatch} from 'react-redux';
import {notExist} from '../store/notification/NotificationStateSlice';
import {setNotificationHasNew} from '../services/domain/NotificationHasNew';

//  {
//       id: 1,
//       title: '레시피톡',
//       body: '레시피톡을 사로잡은 금주의 인기 레시피를, 지금 만나보세요!',
//       createdDate: '2023-04-23',
//       navigations: {},
//       isOpened: true,
//       notificationSort: 'MAIN',
//     },
//     {
//       id: 2,
//       title: '레시피톡',
//       body: '누구님이 게시글에 댓글이 달렸습니다. : 우와 정말 맛있어 보여요!',
//       createdDate: '2023-04-23',
//       navigations: {},
//       isOpened: true,
//       notificationSort: 'COMMENT',
//     },
//     {
//       id: 3,
//       title: '레시피톡',
//       body: '누구님이 회원님의 댓글에 답글이 달렸습니다. : 우와, 어떻게 이렇게 파렴치하게 댓글다세요? 완전 저질;',
//       createdDate: '2023-04-23',
//       navigations: {},
//       isOpened: false,
//       notificationSort: 'CHILD_COMMENT',
//     },
//     {
//       id: 4,
//       title: '레시피톡',
//       body: '레시피톡을 사로잡은 금주의 인기 레시피를, 지금 만나보세요!',
//       createdDate: '2023-04-23',
//       navigations: {},
//       isOpened: false,
//       notificationSort: 'MAIN',
//     },
//     {
//       id: 5,
//       title: '레시피톡',
//       body: '레시피톡을 사로잡은 금주의 인기 레시피를, 지금 만나보세요!',
//       createdDate: '2023-04-23',
//       navigations: {},
//       isOpened: false,
//       notificationSort: 'MAIN',
//     },
export const NotificationScreen = () => {
  const [notis, setNotis] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pagingNum, setPagingNum] = useState(0);
  const [last, setLast] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      dispatch(notExist());
      setNotificationHasNew(false);
      getNotifications(0)
        .then(res => {
          const data = JSON.parse(res.request._response);
          setNotis(data.content);
          setPagingNum(1);
          setLast(data.last);
          setLoading(false);
          console.log(data);
        })
        .catch(err => console.log(err.response));
    }, []),
  );

  const request = () => {
    setLoading(true);
    getNotifications(pagingNum).then(res => {
      const data = JSON.parse(res.request._response);
      setNotis(notis => notis.concat(data.content));
      setPagingNum(pagingNum => ++pagingNum);
      setLast(data.last);
      setLoading(false);
    });
  };

  const onRefresh = () => {
    setLoading(true);
    getNotifications(0).then(res => {
      const data = JSON.parse(res.request._response);
      setNotis(data.content);
      setPagingNum(1);
      setLast(data.last);
      setLoading(false);
    });
  };

  return (
    <Container>
      <NavigationHeader title={'알림'} navigation={useNavigation()} />
      <FlatList
        data={notis}
        renderItem={({item}) => renderItem(item, navigation)}
        keyExtractor={_ => _.id}
        onRefresh={onRefresh}
        refreshing={refresh}
        onEndReached={() => {
          if (loading) {
            return;
          }
          if (!last) {
            request();
          }
        }}
        onEndReachedThreshold={0.6}
        ListEmptyComponent={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'normal',
                fontFamily: 'Pretendard Variable',
                fontSize: 14,
              }}>
              알림이 존재하지 않습니다
            </Text>
          </View>
        )}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </Container>
  );
};

const getIconUri = notificationSort => {
  if (notificationSort === NotificationSortList[0].key) {
    return require('../assets/images/Comment_w.png');
  } else if (notificationSort === NotificationSortList[1].key) {
    return require('../assets/images/Comment_w.png');
  } else if (notificationSort === NotificationSortList[2].key) {
    return require('../assets/images/Recipe_w.png');
  } else if (notificationSort === NotificationSortList[3].key) {
    return require('../assets/images/Ingredient_w.png');
  } else if (notificationSort === NotificationSortList[4].key) {
    return require('../assets/images/IngredientTrimming_w.png');
  } else if (notificationSort === NotificationSortList[5].key) {
    return require('../assets/images/App_Icon.png');
  } else if (notificationSort === NotificationSortList[6].key) {
    return require('../assets/images/Mypage_w.png');
  } else {
    return require('../assets/images/App_Icon.png');
  }
};

const renderItem = (item, navigation) => {
  return (
    <TouchableOpacity
      onPress={determineNavigationWithNotiSort(
        item.notificationSort,
        item.navigations,
        navigation,
      )}>
      <NotiContainer isOpened={item.isOpened}>
        <IconBackground sort={item.notificationSort}>
          <Icon
            source={getIconUri(item.notificationSort)}
            resizeMode={'contain'}
          />
        </IconBackground>
        <NotiDescriptionPart>
          <Description ellipsizeMode={'tail'} numberOfLines={2}>
            {item.body}
          </Description>
          <View style={{position: 'relative'}}>
            <CreatedDateLabel
              createdDate={item.createdDate}
              ellipsizeMode={'tail'}
              numberOfLines={0}
            />
          </View>
        </NotiDescriptionPart>
      </NotiContainer>
    </TouchableOpacity>
  );
};

const determineNavigationWithNotiSort = (
  notificationSort,
  navigations,
  navigation,
) => {
  if (notificationSort === 'COMMENT') {
    return () => {
      navigation.push(determineNavigation(navigations.boardSort), navigations);
    };
  } else if (notificationSort === 'CHILD_COMMENT') {
    return async () => {
      await navigation.push(determineNavigation(navigations.boardSort), {
        boardId: navigations.boardId,
      });
      //TODO : Parent Comment 가져오는 로직 필요
    };
  } else if (notificationSort === 'FOLLOWING') {
    return () => {
      navigation.push('ProfileScreen', {username: navigations.username});
    };
  }
};

const determineNavigation = boardSort => {
  if (boardSort === 'RECIPE') {
    return 'RecipeDetailScreen';
  } else if (boardSort === 'TRIMMING') {
    return 'PrepDetail';
  } else if (boardSort === 'DESCRIPTION') {
    return 'Efficacy';
  }
};

const Description = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  width: 100%;
  position: relative;
`;

const NotiDescriptionPart = styled.View`
  flex: 1;
  gap: 3px;
`;

const NotiContainer = styled.View`
  width: 100%;
  height: 78px;
  background: ${props => (props.isOpened ? '#f5f5f5' : 'white')};
  padding-left: 7%;
  padding-right: 7%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
  flex-direction: row;
  gap: 11px;
  align-items: center;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background: white;
`;

const Icon = styled.Image`
  width: 16px;
  height: 11.37px;
`;

const IconBackground = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  background: ${props => (props.sort === 'MAIN' ? '#f09311' : '#c8c8c8')};
`;

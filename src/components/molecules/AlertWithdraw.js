import React from 'react';
import styled from 'styled-components/native';
import Alert from '../atoms/Alert';
import {View} from 'react-native';
import {requestWithdraw} from '../../services/MyPage';
import {useToast} from 'react-native-toast-notifications';
import {RemoveFcmConnect} from '../../services/fcm/FcmConnect';
import {deleteLoginToStorage} from '../../services/repository/AutoLogin';
import {deleteJwtAccessTokenToStorage} from '../../services/repository/JwtToken';

export default function AlertWithdraw({navigation, notAction}) {
  const toast = useToast();
  const withdrawAction = () => {
    requestWithdraw()
      .then(async () => {
        await deleteLoginToStorage();
        await deleteJwtAccessTokenToStorage();
        await notAction(false);
        await navigation.reset({routes: [{name: 'Login'}]});
      })
      .catch(() => {
        notAction(false);
        toast.show('회원탈퇴에 실패했습니다. 나중에 다시 시도해주세요');
      });
  };

  return (
    <Alert setAlert={notAction}>
      <Inner>
        <TitlePart>회원탈퇴</TitlePart>
        <TextPartTwo>{'레시피톡 회원탈퇴 안내'}</TextPartTwo>
        <TextPart>
          {`탈퇴하시면 레시피톡 게시물은 유지되며, 이용중인 모든 개인 데이터는 삭제되며, 재 가입시 복구가 불가능합니다.

*유의사항을 모두 확인하였으며, 회원을 탈퇴합니다.
`}
        </TextPart>
      </Inner>
      <VerticalBar />
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={() => {
            withdrawAction();
          }}>
          <YesButtonLabel>회원 탈퇴하기</YesButtonLabel>
        </Button>
        <HorizontalBar />
        <Button onPress={() => notAction(false)}>
          <NoButtonLabel>취소</NoButtonLabel>
        </Button>
      </View>
    </Alert>
  );
}
const HorizontalBar = styled.View`
  width: 1px;
  height: 100%;
  background: #d8d8d8;
`;

const VerticalBar = styled.View`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
`;

const Inner = styled.View`
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10%;
  padding-right: 10%;
`;

const TextPart = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;

const TextPartTwo = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #666666;
  text-decoration-line: underline;
`;

const TitlePart = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;

  text-align: center;
  color: #333333;
`;

const Button = styled.TouchableOpacity`
  width: 50%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const YesButtonLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #f09311;
`;

const NoButtonLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #666666;
`;

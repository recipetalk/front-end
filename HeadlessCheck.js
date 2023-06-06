import {Platform} from 'react-native';
import AppFake from './AppFake';
import AppWrapper from './AppWrapper';
import CodePush from 'react-native-code-push';

function HeadlessCheck({isHeadless}) {
  if (Platform.OS === 'ios') {
    if (isHeadless) {
      console.log('headless');
      return <AppFake />;
    } else {
      return <AppWrapper />;
    }
  }
  return <AppWrapper />;
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: '업데이트 요청이 있습니다.',
    optionalUpdateMessage:
      '필수 업데이트가 있습니다. 업데이트를 진행하시겠습니까?',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '아니요',
  },
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(HeadlessCheck);

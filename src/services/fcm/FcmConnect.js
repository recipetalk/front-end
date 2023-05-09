import {jsonAPI} from '../connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4Mzg4MDg3MywidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.T85g3E3LYQB_xsigXVsdsqN-MbY1yNX90qNOEmCyd70',
  },
};

export const RequestFcmConnect = async (fcmToken, isListenable) => {
  const url = '/api/connect';
  const data = {fcmToken: fcmToken, isListenable: isListenable};
  console.log(data);
  return await jsonAPI.post(url, data, config);
};

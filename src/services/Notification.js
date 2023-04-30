import {jsonAPI} from './connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4NDUxMDU1OCwidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.VLj-zZtiZ7CykAqjdgncE5X2cEi9kalgZaj_D2THypI',
  },
};

export const getNotifications = async pagingNum => {
  const url = `/api/notification?page=${pagingNum}`;

  return await jsonAPI.get(url, config);
};

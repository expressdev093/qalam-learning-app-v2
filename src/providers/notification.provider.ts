import {NotificationProvider, OpenNotificationParams} from '@refinedev/core';
import Toast from 'react-native-toast-message';

export const notificationProvider: NotificationProvider = {
  open: (params: OpenNotificationParams) => {
    Toast.show({
      type: params.type,
      text1: params.message === 'AxiosError' ? 'OOPS!' : params.message,
      text2: params.description,
    });
  },
  close: () => {},
};
